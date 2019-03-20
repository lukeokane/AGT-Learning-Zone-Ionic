import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Booking } from '../../../../class/Booking';

/**
 * Generated class for the AdminEditBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-edit-booking',
  templateUrl: 'admin-edit-booking.html',
})
export class AdminEditBookingPage {
  selectedBooking: Booking;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get("selectedBooking") != null || this.navParams.get("selectedBooking") != undefined) {
      this.selectedBooking = this.navParams.get("selectedBooking");
      console.log("SELECTED BOOKING", this.selectedBooking);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEditBookingPage');
  }

}
