import { Booking } from './../../../class/Booking';
import { FirstRunPage } from './../../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { LoginService } from '../../../providers/login/login.service';
import { BookingsService } from '../../../services/Booking.provider';
import { Principal } from '../../../providers/auth/principal.service';
import { CalendarService } from '../../../services/Calendar.provider';


@IonicPage()
@Component({
  selector: 'page-itlc-home',
  templateUrl: 'itlc-home.html',
})
export class ItlcHomePage {
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
  selectedBooking: Booking = new Booking();
  bookings: Array<any>;
  dateStart: any;
  constructor(public calendarService: CalendarService, public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private principal: Principal,
    private app: App,
    private loginService: LoginService,
    private bookingService: BookingsService) {
    this.today = new Date();
    let d = new Date();
    d.setUTCHours(0);
    this.generateDate(d);
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
  }


  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.app.getRootNavs()[0].setRoot(FirstRunPage);
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

      var index = this.bookings.findIndex((value, index, array) => {
        return typeof (value.booking.startTime) == "string" ? value.booking.startTime.substring(0, 19) == s.substring(0, 19) : value.booking.startTime.toISOString() == s.substring(0, 19);
      });
        let checkinModal = this.modalCtrl.create("ItlcModalPage", { selectedBooking: this.bookings[index].booking });
        checkinModal.present();
    }

    // let profileModal = this.modalCtrl.create("AdminCheckBookingDetailsModalPage", { dateSelected: dateSelected, timeSelected: timeInt });
    // profileModal.onDidDismiss(data => {

    // });
    // profileModal.present();


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
    if (this.dateStart == null || this.dateStart == undefined) {
      this.dateStart = "2018-09-10T00:00:00.000Z";
    }
    var yearStart: any = new Date(Date.UTC(Number(this.dateStart.substring(0, 4)), (Number(this.dateStart.substring(5, 7)) - 1), Number(this.dateStart.substring(8, 10))));


    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  }

  getStartDae() {
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
    if (this.bookings != undefined && this.bookings != null) {
      let found = this.bookings.find((value, index, array) => {
        let t: boolean = typeof (value.booking.startTime) == 'string' ? value.booking.startTime.substring(11, 13) == time.substring(0, 2) : value.booking.startTime.toISOString().substring(11, 13) == time.substring(0, 2);
        let d: boolean = typeof (value.booking.startTime) == 'string' ? value.booking.startTime.substring(0, 11) == date.toISOString().substring(0, 11) : value.booking.startTime.toISOString().substring(0, 11) == date.toISOString().substring(0, 11);
        return t && d;
      });
      if (found != undefined) {
        this.selectedBooking = found.booking;
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
  checkPreviousDisabled() {
    if (this.today.getTime() > this.dates[0].getTime()) {
      return true;
    }
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
}
