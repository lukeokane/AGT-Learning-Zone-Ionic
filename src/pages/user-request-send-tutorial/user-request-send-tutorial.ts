import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the UserRequestSendTutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-request-send-tutorial',
  templateUrl: 'user-request-send-tutorial.html',
})
export class UserRequestSendTutorialPage {
  booking;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    if (this.navParams.get("booking") != null && this.navParams.get("booking") != undefined) {
    this.booking = this.navParams.get("booking");
      console.log(this.booking);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRequestSendTutorialPage');
  }
  onClickBtn(send: boolean) {
    this.viewCtrl.dismiss(send);
  }

}
