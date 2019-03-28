import { Booking } from './../../class/Booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItlcModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itlc-modal',
  templateUrl: 'itlc-modal.html',
})
export class ItlcModalPage {
  selectedBooking:Booking = new Booking();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.get('selectedBooking') != null || navParams.get('selectedBooking') != undefined) {
      this.selectedBooking = navParams.get('selectedBooking');
    }
    console.log("HIIIII", this.selectedBooking);
  }


}
