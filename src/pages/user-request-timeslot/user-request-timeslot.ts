import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Booking } from '../../class/Booking';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private viewCtrl: ViewController) {
    if (this.navParams.get("booking") != null && this.navParams.get("booking") != undefined)
      this.booking = this.navParams.get("booking");
    else
      this.viewCtrl.dismiss();

    this.dateSelected = this.navParams.get("dateSelected");
    this.timeSelected = this.navParams.get("timeSelected");
    this.dateStart = this.navParams.get("dateStart");
    this.dateEnd = this.navParams.get("dateEnd");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRequestTimeslotPage');
  }

  onClickRequest() {
    let confirmModal = this.modalCtrl.create("UserRequestSendTutorialPage", { booking: this.booking });
    confirmModal.onDidDismiss(data => {
      // return send ; true=send
      if(data!=undefined && data !=null){
        if(data==true){
//send to backend

        }
        this.viewCtrl.dismiss(data);
      }
    });
    confirmModal.present();
  }

}
