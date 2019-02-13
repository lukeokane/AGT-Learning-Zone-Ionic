import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Booking } from '../../class/Booking';
import { AvailableTime } from '../../class/AvailableTime';

/**
 * Generated class for the UserRequestTimeslotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-request-timeslot',
  templateUrl: 'user-request-timeslot.html',
})
export class UserRequestTimeslotPage {
  dateSelected: Date;
  timeSelected: any;
  booking: Booking;
  dateStart: any;
  dateEnd: any;
  availableTimes: Array<{ date: Date, time: Array<AvailableTime> }>;
  days: String[] = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  selectedTime: Array<AvailableTime>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private viewCtrl: ViewController) {
    if (this.navParams.get("booking") != null && this.navParams.get("booking") != undefined)
      this.booking = this.navParams.get("booking");
    else
      this.viewCtrl.dismiss();

    this.dateSelected = this.navParams.get("dateSelected");
    this.timeSelected = this.navParams.get("timeSelected");
    this.dateStart = this.navParams.get("dateStart");
    this.dateEnd = this.navParams.get("dateEnd");
    this.availableTimes = this.navParams.get("availableTimes");

    this.selectedTime = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRequestTimeslotPage');
  }

  onClickRequest() {
    this.convertAllSelectedTime();
    let confirmModal = this.modalCtrl.create("UserRequestSendTutorialPage", { booking: this.booking });
    confirmModal.onDidDismiss(data => {
      // return send ; true=send
      if (data != undefined && data != null) {
        // if (data == true) {
        //   //send to backend

        // }
        this.viewCtrl.dismiss({send:data,booking:this.booking});
      }
    });
    confirmModal.present();
  }

  convertAllSelectedTime() {
    let s = "";
    this.selectedTime.forEach((value, index) => {
      s = s + value.startTime.toISOString().substring(0, 19) + "Z|" + value.endTime.toISOString().substring(0, 19) + "Z"
      if (index != this.selectedTime.length - 1) {
        s += "&"
      }
    });
    this.booking.requestTimes = s;
  }
  onSelectTimeSlot(t: AvailableTime) {
    let i = this.selectedTime.findIndex(value => t.startTime.toISOString().substring(0, 21) == value.startTime.toISOString().substring(0, 21));
    if (i == -1) {
      this.selectedTime.push(t);

    } else {
      this.selectedTime.splice(i, 1);
    }
    console.log(this.selectedTime);
  }
  checkSelected(t: AvailableTime) {
    if (this.selectedTime.some(value => t.startTime.toISOString().substring(0, 21) == value.startTime.toISOString().substring(0, 21))) {
      return "time-slot-selected-btn";
    } else {
      return "time-slot-btn";
    }

  }
}
