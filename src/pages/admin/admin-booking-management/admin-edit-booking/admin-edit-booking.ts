import { adminCancelBookingPage } from './../../../pages';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Booking } from '../../../../class/Booking';
import { BookingService } from '../../../../providers/booking/booking.service';
import { BookingsService } from '../../../../services/Booking.provider';
import { UserService } from '../../../../services/User.provider';
import { HttpResponse } from '@angular/common/http';
import { User } from '../../../../class/User';
import { UserInfo } from '../../../../class/UserInfo';
import { UserInfoService } from '../../../../services/UserInfo.provider';
import { BookingDetails } from '../../../../class/BookingDetails';

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
export class AdminEditBookingPage implements OnInit {
  selectedBooking: Booking;
  date: any;
  minDate;
  filterTutors: Array<User> = [];
  filterUsers: Array<User> = [];
  bookingDetails: BookingDetails = new BookingDetails();

  userInfos: Array<UserInfo>;
  constructor(public navCtrl: NavController,
    public bookingsService: BookingsService,
    private userService: UserService,
    private userInfoService: UserInfoService,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController
  ) {
    if (this.navParams.get("selectedBooking") != null || this.navParams.get("selectedBooking") != undefined) {
      this.selectedBooking = this.navParams.get("selectedBooking");
      this.minDate = new Date().toISOString();
      this.date = this.selectedBooking.startTime;
      this.filterUsers = [];
    } else {
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEditBookingPage');
  }
  ngOnInit() {
    this.initUsers();
  }
  getName(id) {

    let index = this.filterUsers.findIndex(user => user.id == id);
    if (index != -1) {
      return this.filterUsers[index].firstName + " " + this.filterUsers[index].lastName;
    } else {
      return "";
    }
  }
  initUsers() {
    this.userService.query()
      .subscribe(
        (response) => {
          this.filterTutors = [];
          response.forEach(user => {
            if (user.activated == true) {
              user.authorities.forEach(authority => {
                if (authority == "ROLE_TUTOR") {
                  this.filterTutors.push(user);
                  this.initUserInfo(user.id);
                }
                if (this.selectedBooking.userInfos.findIndex(info => info.userId == user.id) != -1) {
                  this.filterUsers.push(user);
                }
              });
            }
          });
        },
        (error) => {
          console.error(error);
          // let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          // toast.present();
        });
  }

  initUserInfo(userId: any) {
    this.userInfos = [];

    if (userId != null || userId != undefined) {
      this.userInfoService.find(userId).subscribe((response) => {
        this.userInfos.push(response);
        this.userInfos = this.userInfos.filter(function (a) {
          return !this[a.id] && (this[a.id] = true);
        }, Object.create(null));
      })
    }
  }


  submitEdit() {
    if (typeof this.selectedBooking.tutorAcceptedId == "string") {
      this.selectedBooking.tutorAcceptedId = null;
    } else if (typeof this.selectedBooking.tutorAcceptedId == "number") {
      this.selectedBooking.tutorAccepted = true;
    }
    if (this.selectedBooking.cancelled) {
      this.selectedBooking.cancelled = false;
      // if(this.selectedBooking.tutorAcceptedId!=null || this.selectedBooking.tutorAcceptedId!=undefined){
      this.selectedBooking.adminAcceptedId = 3;
      // }else
    }

    this.selectedBooking.startTime = this.date.substring(0, 11) + this.selectedBooking.startTime.substring(11, 16) + ":00Z";
    this.selectedBooking.endTime = this.date.substring(0, 11) + this.selectedBooking.endTime.substring(11, 16) + ":00Z";
    // this.selectedBooking.startTime = 
    this.bookingDetails.booking = this.selectedBooking;


    this.bookingDetails.message = null
    console.log(this.bookingDetails);
    this.bookingsService.updateBooking(this.bookingDetails).subscribe(data => {
      console.log(data);
      this.viewCtrl.dismiss({ booking: this.bookingDetails.booking });
    }, (erro) => {
      console.error(erro);
    });
  }
  cancel() {
    this.navCtrl.pop();
  }

  goToCancelBooking(selectedBooking: Booking) {
    let tag = "cancelBooking";
    let cancelModal = this.modalCtrl.create(adminCancelBookingPage, { selectedBooking: selectedBooking, tag: tag });
    cancelModal.present();
    cancelModal.onDidDismiss(data => {
      console.log(data);
      if (data != null && data != undefined) {
        this.viewCtrl.dismiss({ booking: data.booking });

      } else {
        this.viewCtrl.dismiss();

      }
    });
  }
}
