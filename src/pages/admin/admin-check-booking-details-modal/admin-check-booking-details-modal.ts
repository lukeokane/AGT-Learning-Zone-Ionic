import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  booking: BookingDetails;
  topicsString: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
  ) {
    if (this.navParams.get("booking") != null && this.navParams.get("booking") != undefined) {
      this.booking = this.navParams.get("booking");
      console.log(this.booking);
      this.topicsString = "";
      if (this.booking.booking.topics.length == 0) {
        this.topicsString = "Not Specified";

      }
      this.booking.booking.topics.forEach((value, index, array) => {
        this.topicsString = this.topicsString + value.title;
        if (index != this.booking.booking.topics.length - 1) {
          this.topicsString = this.topicsString + ", ";
        }
      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCheckBookingDetailsModalPage');
  }
  getTimeSubString(s: String, first, last) {
    return s.substring(first, last);
  }
  getNoStudent() {
    if (this.booking.booking.userInfos != null && this.booking.booking.userInfos != undefined) {
      return this.booking.booking.userInfos.length == 0 ? 1 : this.booking.booking.userInfos.length
    } else {
      return 0;
    }
    // return this.booking.booking.userInfos.length == 0 ? 1 : this.booking.booking.userInfos.length;

  }
  onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
