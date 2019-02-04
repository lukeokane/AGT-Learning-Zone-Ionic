import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Booking } from '../../class/Booking';

/**
 * Generated class for the UserRequestModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-request-modal',
  templateUrl: 'user-request-modal.html',
})
export class UserRequestModalPage {
  dateSelected: Date;
  timeSelected: any;
  visible1: any;
  visible2: any;
  visible3: any;
  booking:Booking;

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl:ModalController,private viewCtrl:ViewController) {
    this.dateSelected = this.navParams.get("dateSelected");
    this.timeSelected = this.navParams.get("timeSelected");
    this.visible1 = true;
    this.visible2 = true;
    this.visible3 = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlotModalPage');
  }
  convertToString() {
    return "Date: " + this.dateSelected.getDate() + "/" + (this.dateSelected.getMonth() + 1) + " Time:" + this.timeSelected + ":00";
  }

  onClickPriority(tyle: String, visible: any) {
    if (visible == 1) {
      this.visible1 = false;
      this.visible2 = true;
      this.visible3 = true;

    } else if (visible == 2) {
      this.visible2 = false;
      this.visible1 = true;
      this.visible3 = true;


    } else if (visible == 3) {
      this.visible3 = false;
      this.visible1 = true;
      this.visible2 = true;
    }

  }

  onClickContinue(){
    let timeSlotModal = this.modalCtrl.create("UserRequestTimeslotPage", {booking: this.booking });
    timeSlotModal.onDidDismiss(data => {
      this.viewCtrl.dismiss(data);

    });
    timeSlotModal.present();
  }
}
