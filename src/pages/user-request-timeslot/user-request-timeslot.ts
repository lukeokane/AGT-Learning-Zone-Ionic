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
  booking: Booking;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private viewCtrl: ViewController) {
    // if (this.navParams.get("booking") != null && this.navParams.get("booking") != undefined)
    //   this.booking = this.navParams.get("booking");
    // else
    //   this.viewCtrl.dismiss();
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
