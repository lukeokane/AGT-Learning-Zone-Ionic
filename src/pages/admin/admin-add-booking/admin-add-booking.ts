import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminAddBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-add-booking',
  templateUrl: 'admin-add-booking.html',
})
export class AdminAddBookingPage {

  dateStart: any;
  dateEnd: any;
  dateEndMinDate;
  minDate;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.minDate = new Date().toISOString();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddBookingPage');
  }
  changeStartDate() {
    this.dateEndMinDate = this.dateStart;
    this.dateEnd = "";

  }
  onCreateBooking(){
    
  }
}
