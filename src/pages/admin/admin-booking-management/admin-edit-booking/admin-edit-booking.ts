import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Booking } from '../../../../class/Booking';
import { BookingService } from '../../../../providers/booking/booking.service';
import { BookingsService } from '../../../../services/Booking.provider';

/**
 * Generated class for the AdminEditBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-edit-booking',
  templateUrl: 'admin-edit-booking.html',
})
export class AdminEditBookingPage {
  selectedBooking: Booking;

  constructor(public navCtrl: NavController, 
    public bookingsService:BookingsService,
    public navParams: NavParams,
    private modalCtrl:ModalController
    ) {
    if (this.navParams.get("selectedBooking") != null || this.navParams.get("selectedBooking") != undefined) {
      this.selectedBooking = this.navParams.get("selectedBooking");
      console.log("SELECTED BOOKING", this.selectedBooking);
    }else{
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEditBookingPage');
  }
  submitEdit(){
    this.bookingsService.updateBooking(this.selectedBooking).subscribe(data => {
    console.log(data);
    }, (erro) => {
      console.error(erro);
    })
  }
  cancel(){
    this.navCtrl.pop();
  }

  goToCancelBooking(selectedBooking:Booking)
  {
    let cancelModal = this.modalCtrl.create("AdminCancelBookingPage",{selectedBooking:selectedBooking});
    cancelModal.present();
  }
}
