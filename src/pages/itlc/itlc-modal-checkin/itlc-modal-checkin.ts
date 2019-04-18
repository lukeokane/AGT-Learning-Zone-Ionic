import { BookingUserDetails } from './../../../class/BookingUserDetails';
import { BookingUserDetailService } from './../../../services/BookingUserDetails.provider';
import { Booking } from './../../../class/Booking';
import { UserService } from './../../../services/User.provider';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import Quagga from 'quagga';
import { itlcHomePage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-itlc-modal-checkin',
  templateUrl: 'itlc-modal-checkin.html',
})
export class ItlcModalCheckinPage implements OnInit {
  login: any;
  user: any;
  selectedBooking: Booking = new Booking();
  clicked: boolean = false;
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private userService: UserService,
    private bookingUserDetailService: BookingUserDetailService,
    private viewCtrl: ViewController
  ) {
    if (navParams.get('selectedBooking') != null || navParams.get('selectedBooking') != undefined) {
      this.selectedBooking = navParams.get('selectedBooking');
    }
  }

  ngOnInit() {
    //automatic click to collect result
    document.getElementById("modal").click();
    let code = "";
    window.addEventListener('keypress', e => {
      //Because our scanner throws an 'Enter' key at the end of scanning
      if (e.keyCode === 13) {
          console.log("Scanned Result ", code);
        this.login = code;
        this.checkInManual();
      } else {
        code += e.key;        
      }
    })
  }


  checkInUserDetails(barcode: any) {
    this.userService.getUserByLogin(barcode).subscribe(user => {
      this.user = user;
      console.log("this user", this.user);
    }, (error) => {
      console.error(error);
    });
  }

  checkIn() {
    let bookingUserDetails
    bookingUserDetails = new BookingUserDetails();
    if (this.selectedBooking != null || this.selectedBooking != undefined) {
      this.bookingUserDetailService.updateBookingUserDetailsForCheckIn(this.selectedBooking.id, this.login, bookingUserDetails).subscribe(data => {
        console.log("data", data);
        this.navCtrl.push(itlcHomePage);
      }, (error) => {
        console.error(error);
      });
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  manualCheckIn() {
    this.clicked = true;
  }
  checkInManual() {
    if(<HTMLInputElement>document.getElementById("input_id") != null || <HTMLInputElement>document.getElementById("input_id") != undefined)
    {
   this.login = (<HTMLInputElement>document.getElementById("input_id")).value;
    }
    if(this.login != null || this.login != undefined)
    {
    this.checkInUserDetails(this.login);
    }
  }
}



