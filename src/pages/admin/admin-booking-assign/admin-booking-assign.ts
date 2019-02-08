import { HttpResponse } from '@angular/common/http';
import { homePage } from './../../pages';
import { UserInfoService } from './../../../services/UserInfo.provider';
import { UserService } from './../../../services/User.provider';
import { Booking } from './../../../class/Booking';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { User } from '../../../class/User';
import { UserInfo } from '../../../class/UserInfo';
import { BookingsService } from '../../../services/Booking.provider';

@IonicPage()
@Component({
  selector: 'page-admin-booking-assign',
  templateUrl: 'admin-booking-assign.html',
})
export class AdminBookingAssignPage implements OnInit {
  selectedBooking: Booking;
  filterTutors: Array<User> = [];
  userInfos: Array<UserInfo>;
  predicate: any = 'id';
  previousPage: any;
  reverse: any;
  itemsPerPage: any;
  page: number;
  totalItems: any;
  queryCount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private toastCtrl: ToastController, private userInfoService: UserInfoService, private bookingService: BookingsService, private alertCtrl: AlertController) {
    if (this.navParams.get("selectedBooking") != null || this.navParams.get("selectedBooking") != undefined) {
      this.selectedBooking = this.navParams.get("selectedBooking");
      console.log("Selected booking to assign to tutor : ", this.selectedBooking);
    }
  }

  ngOnInit() {
    this.initUsers();
    this.initUserInfo();
  }

  initUsers() {
    this.itemsPerPage = 9;
    this.userService.getAllUsers(
      {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<User[]>) => {
          this.onSuccess(res.body, res.headers)
        },
        (error) => {
          console.error(error);
          let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          toast.present();
        });
  }

  initUserInfo() {
    this.itemsPerPage = 32;
    this.userInfoService.getAllUserInfos(
      {
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<UserInfo[]>) => {
          this.onSuccess1(res.body, res.headers)
        },
        (error) => {
          console.error(error);
          let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          toast.present();
        });
  }

  private onSuccess(data, headers) {
    this.filterTutors =[];
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;

    data.forEach(user => {
      user.authorities.forEach(authority => {
        if (authority == "ROLE_TUTOR") {
          this.filterTutors.push(user);
          console.log(this.filterTutors);
        }
      });
    });
  }

  private onSuccess1(data, headers) {
    this.userInfos=[];
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.userInfos =data;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.initUsers();
    }
  }


  ContinueAlert(tutorId: any) {
    let fullName: any;

    this.filterTutors.forEach(tutor => {
      if (tutor.id == tutorId) {
        fullName = tutor.firstName + " " + tutor.lastName;
      }
    });

    let alert = this.alertCtrl.create({
      title: 'Requested Tutorial<br> <h6>This tutorial is assigned to</h6>',
      subTitle: fullName,
      buttons: [
        {
          text: 'Continue',
          handler: () => {
            this.assignToTutor(tutorId);
          }
        },

      ],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }



  assignToTutor(tutorId: number) {
    if (tutorId != null || tutorId != undefined) {
      this.selectedBooking.adminAcceptedId = tutorId;
    }
    if (this.selectedBooking != null || this.selectedBooking != undefined) {
      this.bookingService.saveBooking(this.selectedBooking);
      this.navCtrl.push(homePage);
    }
  }
}
