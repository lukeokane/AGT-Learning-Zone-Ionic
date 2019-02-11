import { itlcModalCheckinPage } from './../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


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
