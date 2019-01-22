import { Booking } from './../../../class/Booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdinalScale } from '../../../class/OrdinalScale';

/**
 * Generated class for the AdminBookingManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-booking-management',
  templateUrl: 'admin-booking-management.html',
})
export class AdminBookingManagementPage {

  menuClicked: boolean = false;
  bookings: Array<Booking>;
  selectedBooking: Booking;
  dayOfWeek:any;  
  time:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bookings = [new Booking(1, "help in Java", "Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00"), "I'm trying to learn the best way to implement interfaces with inheritance for a topic being taught in Object Oriented Programming next week", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Luke O'Kane", new Date("Tue Oct 23 2018 12:00:00"), new Date("Tue Oct 23 2018 13:00:00"), "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard", OrdinalScale.HIGH), new Booking(1, "help in Java", "Marcus Philips", new Date("Wed Oct 24 2018 09:00:00"), new Date("Wed Oct 24 2018 10:00:00"), "Lorem Ipsum sit amit consecteur", OrdinalScale.LOW), new Booking(1, "help in Java", "Farwa Javed", new Date("Tue Oct 23 2018 14:00:00"), new Date("Tue Oct 23 2018 15:00:00"), "it to make a type specimen book. It has survived not only five centuries, but also the leap", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Shaun Conroy", new Date(), new Date(), "Lorem Ipsum sit amit consecteur", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Thomas Larkin", new Date("Fri Oct 26 2018 16:00:00"), new Date("Fri Oct 26 2018 17:00:00"), "more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", OrdinalScale.HIGH)];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminBookingManagementPage');
  }

  goToBooking(booking: Booking) {
    this.selectedBooking = booking;
    this.dayOfWeek= this.selectedBooking.startTime.getDay() ==0 ? "Sunday" : this.selectedBooking.startTime.getDay()==1? "Monday" : this.selectedBooking.startTime.getDay()== 2 ? "Tuesday" : this.selectedBooking.startTime.getDay()== 3 ? "Wednesday" :  this.selectedBooking.startTime.getDay()== 4 ? "Thursday" :  this.selectedBooking.startTime.getDay()== 5 ? "Friday" : this.selectedBooking.startTime.getDay()== 6 ? "Saturday"  : void 0;
  }  

  goToCheckIn()
  {
    this.navCtrl.push("ItlcModalCheckinPage");
  }

}
