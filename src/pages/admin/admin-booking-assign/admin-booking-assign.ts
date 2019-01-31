import { Booking } from './../../../class/Booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminBookingAssignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-booking-assign',
  templateUrl: 'admin-booking-assign.html',
})
export class AdminBookingAssignPage {

  selectedBooking: Booking;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get("selectedBooking") != null || this.navParams.get("selectedBooking") != undefined) {
      this.selectedBooking = this.navParams.get("selectedBooking");
      console.log("Selected booking to assign to tutor : ", this.selectedBooking);
    }
  }

}
