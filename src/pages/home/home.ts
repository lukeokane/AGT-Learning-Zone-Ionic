import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, ModalController } from 'ionic-angular';
import { Principal } from '../../providers/auth/principal.service';
import { FirstRunPage } from '../pages';
import { LoginService } from '../../providers/login/login.service';
import { BookingsService } from '../../services/Booking.provider';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
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
    private principal: Principal,
    private app: App,
    private loginService: LoginService,
    private modalCtrl: ModalController,
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

  logout() {
    this.loginService.logout();
    this.app.getRootNavs()[0].setRoot(FirstRunPage);
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
    var timeS1 = "" + timeInt;
    if (timeInt < 10) {
      timeS1 = "0" + timeSelected + "";
    }
    let s = dateSelected.toISOString().substring(0, 10) + "T" + timeS1 + ":00:00Z";

    if (this.bookings.some((value, index, array) => {
      return typeof (value.booking.startTime) == "string" ? value.booking.startTime.substring(0, 19) == s.substring(0, 19) : value.booking.startTime.toISOString() == s.substring(0, 19);
    })) {

    }
    let profileModal = this.modalCtrl.create("AdminCheckBookingDetailsModalPage", { dateSelected: dateSelected, timeSelected: timeInt });
    profileModal.onDidDismiss(data => {

    });
    profileModal.present();
  }
  timeConvertedToInt(time: String) {
    var timeSub = time.substring(0, 2);
    var timeInt = parseInt(timeSub, 10);
    return timeInt;
  }
  checkMatchTime(time: String) {
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
}
