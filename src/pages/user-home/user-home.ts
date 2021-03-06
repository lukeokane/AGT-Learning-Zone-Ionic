import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ToastController, App } from 'ionic-angular';
import { FirstRunPage } from '../pages';
import { Principal } from '../../providers/auth/principal.service';
import { BookingsService } from '../../services/Booking.provider';
import { Booking } from '../../class/Booking';
import { BookingDetails } from '../../class/BookingDetails';
import { CalendarService } from '../../services/Calendar.provider';

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
  weekMonday: Date;
  weekFriday: Date;
  //calendar
  dates: Array<Date>;
  screenWidth: any;
  days: String[] = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  months: String[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today: Date;
  currentDate: Date;
  time: String[] = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "13:00 PM", "14:00 PM", "15:00 PM", "16:00 PM", "17:00 PM"];

  bookings: Array<BookingDetails>;
  dateStart: any;


  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    public calendarService: CalendarService,
    private toastCtrl: ToastController,
    private principal: Principal,
    private app: App,
    private bookingService: BookingsService) {

    this.today = new Date();
    let d = new Date();
    d.setUTCHours(0);
    this.generateDate(d);
    this.screenWidth = window.screen.width;
    this.bookings = [];

  }

  ngOnInit() {
    this.principal.identity().then((account) => {
      if (account === null) {
        this.app.getRootNavs()[0].setRoot(FirstRunPage);
      } else {
        this.account = account;
      }
    });
    this.getStartDate();

  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  getAllBooking() {
    this.bookingService.findConfirmedBooking(this.weekMonday.getTime(), this.weekFriday.getTime()).subscribe(data => {
      this.bookings = data;
      if (this.bookings.length == 0) {
        this.bookings = [];
      }
      console.log(this.bookings);
    }, (erro) => {
      console.error(erro);
    })

  }
  generateDate(curDate: Date) {
    this.dates = new Array();
    this.currentDate = curDate;
    var monday = this.getMonday(curDate);
    this.weekMonday = monday;
    this.weekFriday = new Date(this.weekMonday.getTime() + (24 * 60 * 60 * 1000 * 5));
    this.getAllBooking();
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

    let s1 = this.getStartAndEndDate(dateSelected, timeSelected).s;
    let s2 = this.getStartAndEndDate(dateSelected, timeSelected).s2;
    if (new Date() >= new Date(s2)) {
    }
    else {
      if (!(this.bookings.some((value, index, array) => {
        return typeof (value.booking.startTime) == "string" ? value.booking.startTime.substring(0, 19) == s1.substring(0, 19) : value.booking.startTime.toISOString() == s1.substring(0, 19);
      }))) {

        let toast;
        let profileModal = this.modalCtrl.create("UserRequestModalPage", { s1: s1, s2: s2, bookings: this.bookings });

        profileModal.onDidDismiss(data => {
          if (data != undefined && data != null) {
            if (data.send) {
              this.bookingService.create(data.booking).subscribe(data => {
                toast = this.toastCtrl.create({
                  message: 'Thank You! You will receive a confirmation e-mail when your request is approved',
                  position: 'top',
                  showCloseButton: true,
                  closeButtonText: "Close"
                });
                toast.present();

              }, (erro) => {
                toast = this.toastCtrl.create({
                  message: 'Your request is not sent. Please try again',
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
      } else {

        let i = this.bookings.findIndex(value => {
          return typeof (value.booking.startTime) == "string" ? value.booking.startTime.substring(0, 19) == s1.substring(0, 19) : value.booking.startTime.toISOString() == s1.substring(0, 19);
        });
        if (i != -1 && this.bookings[i].booking.subjectId != null) {
          let profileModal = this.modalCtrl.create("UserJoinTutorialModalPage", { booking: this.bookings[i].booking });
          profileModal.onDidDismiss(data => {
            if (data != null && data != undefined) {
              if (data.send == true) {
                let toast = this.toastCtrl.create({
                  message: 'Your request is sent',
                  duration: 5000,
                  position: 'top',
                  showCloseButton: true,
                  closeButtonText: "Close"
                });
                toast.present();
              } else {
                let toast = this.toastCtrl.create({
                  message: 'Error occur, please try again later',
                  duration: 5000,
                  position: 'top',
                  showCloseButton: true,
                  closeButtonText: "Close"
                });
                toast.present();
              }
            }
          });
          profileModal.present();

        }
      }
    }


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
    if (true) {
      // if (this.dateStart == null || this.dateStart == undefined) {     
         this.dateStart = "2018-09-10T00:00:00.000Z";
    }
    var yearStart: any = new Date(Date.UTC(Number(this.dateStart.substring(0, 4)), (Number(this.dateStart.substring(5, 7)) - 1), Number(this.dateStart.substring(8, 10))));


    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  }

  getStartDate() {
    this.calendarService.get().subscribe(data => {
      console.log(data);
    }, (erro) => {
      this.dateStart = erro.error.text;
      console.error(erro.error.text);
    });
  }
  getStartEndDate() {
    return this.dates[0].getDate() + " " + this.months[this.dates[0].getMonth()] + " - " + this.dates[this.dates.length - 1].getDate() + " " + this.months[this.dates[this.dates.length - 1].getMonth()];
  }
  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  onNextWeek() {
    var nextMonday = new Date(this.dates[this.dates.length - 1].getTime());
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
      let found = this.bookings.find((value, index, array) => {

        let t: boolean = typeof (value.booking.startTime) == 'string' ? value.booking.startTime.substring(11, 13) == time.substring(0, 2) : value.booking.startTime.toISOString().substring(11, 13) == time.substring(0, 2);
        let d: boolean = typeof (value.booking.startTime) == 'string' ? value.booking.startTime.substring(0, 11) == date.toISOString().substring(0, 11) : value.booking.startTime.toISOString().substring(0, 11) == date.toISOString().substring(0, 11);
        return t && d;
      });
      if (found != undefined) {
        return found.booking.title;
      }
    }

  }
  getStartAndEndDate(dateSelected: Date, timeSelected: String) {
    var time = timeSelected.substring(0, 2);
    var timeInt = parseInt(time, 10);
    var timeS1 = "" + timeInt;
    if (timeInt < 10) {
      timeS1 = "0" + timeInt + "";
    }
    var timeInt2 = timeInt + 1;
    var timeS2 = "" + timeInt2;
    if (timeInt2 < 10) {
      timeS2 = "0" + timeInt2 + "";
    }
    let s = dateSelected.toISOString().substring(0, 10) + "T" + timeS1 + ":00:00Z";
    let s2 = dateSelected.toISOString().substring(0, 10) + "T" + timeS2 + ":00:00Z";
    return { s, s2 }
  }
  checkPassTime(dateSelected: Date, timeSelected: String) {
    let s1 = this.getStartAndEndDate(dateSelected, timeSelected).s;
    let s2 = this.getStartAndEndDate(dateSelected, timeSelected).s2;
    if (new Date() >= new Date(s2.substring(0, 19))) {
      return 'tg-slot-passed';
    } else {
      return 'tg-slot'
    }
  }
  checkPreviousDisabled() {
    if (this.today.getTime() > this.dates[0].getTime()) {
      return true;
    }
  }
}
