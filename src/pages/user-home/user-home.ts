import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ToastController, App } from 'ionic-angular';
import { FirstRunPage } from '../pages';
import { Principal } from '../../providers/auth/principal.service';
import { BookingsService } from '../../services/Booking.provider';

/**
 * Generated class for the UserHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {

  account: Account;

  //calendar
  dates: Array<Date>;
  screenWidth: any;
  days: String[] = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  months: String[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today: Date;
  currentDate: Date;
  time: String[] = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "13:00 PM", "14:00 PM", "15:00 PM", "16:00 PM", "17:00 PM", "18:00 PM"];

  bookings: Array<any>;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private principal: Principal,
    private app: App,
    private bookingService: BookingsService) {

    this.today = new Date();
    this.generateDate(this.today);
    this.screenWidth = window.screen.width;
  }

  ngOnInit() {
    this.principal.identity().then((account) => {
      if (account === null) {
        this.app.getRootNavs()[0].setRoot(FirstRunPage);
      } else {
        this.account = account;
      }
    });
    this.bookingService.findConfirmedBooking().subscribe(data => {
      this.bookings = data;
    }, (erro) => {
      console.error(erro);
    })
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  generateDate(curDate: Date) {
    this.dates = new Array();
    this.currentDate = curDate;
    var monday = this.getMonday(curDate);
    for (var i = 0; i < 7; i++) {
      var temp = new Date(monday.getTime());
      this.dates.push(temp);
      monday.setTime(monday.getTime() + (24 * 60 * 60 * 1000));
    }

  }
  convertDateToString(date: Date) {
    return "" + this.days[date.getDay()] + " " + date.getDate() + "/" + (date.getMonth() + 1);
  }
  slotClicked(dateSelected: Date, timeSelected: String) {
    var time = timeSelected.substring(0, 2);
    var timeInt = parseInt(time, 10);
    let toast;
    let profileModal = this.modalCtrl.create("UserRequestModalPage", { dateSelected: dateSelected, timeSelected: timeInt, bookings: this.bookings });

    profileModal.onDidDismiss(data => {
      if (data != undefined && data != null) {
        if (data.send) {
          console.log(data.booking);
          this.bookingService.create(data.booking).subscribe(data => {
            console.log(data);
            toast = this.toastCtrl.create({
              message: 'Thank You! You will receive a confirmation e-mail when your request is approved',
              duration: 5000,
              position: 'top',
              showCloseButton: true,
              closeButtonText: "Close"
            });
            toast.present();

          }, (erro) => {
            toast = this.toastCtrl.create({
              message: 'Your request is not sent. Please try again',
              duration: 5000,
              position: 'top',
              showCloseButton: true,
              closeButtonText: "Close"
            });
            toast.present();

            console.error(erro);
          })
          // send to backend

        }

      }
    });
    profileModal.present();
  }
  timeConvertedToInt(time: String) {
    var timeSub = time.substring(0, 2);
    var timeInt = parseInt(timeSub, 10);
    return timeInt;
  }
  checkMatchTime(time: String) {
    //this line for testing only
    // this.today.setHours(11);
    var timeInt = this.timeConvertedToInt(time);
    var hr = this.today.getHours();
    if (timeInt == hr) {
      return true;
    } else {
      return false;
    }
  }
  checkMatchDate(date: Date) {
    var date1 = this.getMonday(date)
    var date2 = this.getMonday(this.today);
    return date1.getUTCFullYear() == date1.getUTCFullYear() && date1.getUTCDate() == date2.getUTCDate() && date1.getMonth() == date2.getMonth();
  }
  getWeekNumber(date: Date) {
    var d: any = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    // **need give admin an option to set start academic year
    var yearStart: any = new Date(Date.UTC(2018, 7, 27));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  }
  getStartEndDate() {
    return this.dates[0].getDate() + " " + this.months[this.dates[0].getMonth()] + " - " + this.dates[6].getDate() + " " + this.months[this.dates[6].getMonth()];
  }
  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  onNextWeek() {
    var nextMonday = new Date(this.dates[6].getTime());
    nextMonday.setTime(nextMonday.getTime() + (24 * 60 * 60 * 1000));
    this.generateDate(nextMonday);

  }
  onPreWeek() {
    var lastSun = new Date(this.dates[0].getTime());
    lastSun.setTime(lastSun.getTime() - (24 * 60 * 60 * 1000));
    this.generateDate(lastSun);
  }
  checkBooking(time: String, date: Date) {
    //d =  date type
    //time = 12:00 pm string

    // console.log(d.toISOString().substring(11,13));//return 11 or 12
    //2019-02-10T22:16:37.213Z
    if (this.bookings != undefined && this.bookings != null) {
      // let temp = this.bookings[0];
      // this.bookings = new Array<any>();
      // this.bookings.push(temp);
      let found = this.bookings.find((value, index, array) => {

        let t: boolean = typeof (value.booking.startTime) == 'string' ? value.booking.startTime.substring(11, 13) == time.substring(0, 2) : value.booking.startTime.toISOString().substring(11, 13) == time.substring(0, 2);
        let d: boolean = typeof (value.booking.startTime) == 'string' ? value.booking.startTime.substring(0, 11) == date.toISOString().substring(0, 11) : value.booking.startTime.toISOString().substring(0, 11) == date.toISOString().substring(0, 11);
        // let t: boolean =  value.booking.startTime.substring(11, 13) == time.substring(0, 2) ;
        // let d: boolean = value.startTime.substring(0, 11) == date.toISOString().substring(0, 11) ;

        return t && d;
      });
      if (found != undefined) {
        return found.booking.title;
      }
    }

  }
}
