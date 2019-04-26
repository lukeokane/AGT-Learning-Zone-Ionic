import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Booking } from '../../../class/Booking';
import { BookingDetails } from '../../../class/BookingDetails';

/**
 * Generated class for the AdminCheckBookingDetailsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-check-booking-details-modal',
  templateUrl: 'admin-check-booking-details-modal.html',
})
export class AdminCheckBookingDetailsModalPage {

  booking: Booking;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get("booking") != null && this.navParams.get("s2") != undefined) {
      this.booking = this.navParams.get("booking");
      console.log(this.booking);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCheckBookingDetailsModalPage');
  }

}
