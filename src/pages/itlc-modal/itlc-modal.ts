import { Booking } from './../../class/Booking';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { itlcModalCheckinPage } from '../pages';

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
export class ItlcModalPage implements OnInit {
  selectedBooking:Booking = new Booking();
  time:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl:ModalController) {
    if (navParams.get('selectedBooking') != null || navParams.get('selectedBooking') != undefined) {
      this.selectedBooking = navParams.get('selectedBooking');
    }
  }

  ngOnInit()
  {
  
  }

  goToCheckin(selectedBooking:Booking)
  {
    let checkinModal = this.modalCtrl.create(itlcModalCheckinPage,{selectedBooking:this.selectedBooking});
    checkinModal.present();
  }

}
