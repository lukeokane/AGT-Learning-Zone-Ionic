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
  check: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bookings = [new Booking(1, "help in Java", "Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00"), "Lorem Ipsum sit amit consecteur", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Luke O'Kane", new Date("Tue Oct 23 2018 12:00:00"), new Date("Tue Oct 23 2018 13:00:00"), "Lorem Ipsum sit amit consecteur", OrdinalScale.HIGH), new Booking(1, "help in Java", "Marcus Philips", new Date("Wed Oct 24 2018 09:00:00"), new Date("Wed Oct 24 2018 10:00:00"), "Lorem Ipsum sit amit consecteur", OrdinalScale.LOW), new Booking(1, "help in Java", "Farwa Javed", new Date("Tue Oct 23 2018 14:00:00"), new Date("Tue Oct 23 2018 15:00:00"), "Lorem Ipsum sit amit consecteur", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Shaun Conroy", new Date(), new Date(), "Lorem Ipsum sit amit consecteur", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Thomas Larkin", new Date("Fri Oct 25 2018 16:00:00"), new Date("Fri Oct 25 2018 17:00:00"), "Lorem Ipsum sit amit consecteur", OrdinalScale.HIGH)];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminBookingManagementPage');
  }

  clicked() {
    this.menuClicked = true;
  }

  goToBooking(booking: Booking) {
    this.selectedBooking = booking;
  }

}
