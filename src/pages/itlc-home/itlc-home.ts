import { itlcModalCheckinPage, itlcHomePage } from './../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';

/**
 * Generated class for the ItlcHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itlc-home',
  templateUrl: 'itlc-home.html',
})
export class ItlcHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItlcHomePage');
  }

  goToCheckInPage()
  {

    let profileModal = this.modalCtrl.create(itlcModalCheckinPage);
    profileModal.onDidDismiss(data => {
      if (data != undefined && data != null) {
  
        
      }
    });
    profileModal.present();
  }

}
