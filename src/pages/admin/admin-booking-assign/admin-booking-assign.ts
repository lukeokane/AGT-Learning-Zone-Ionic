import { homePage } from './../../pages';
import { UserInfoService } from './../../../services/UserInfo.provider';
import { UserService } from './../../../services/User.provider';
import { Booking } from './../../../class/Booking';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Principal } from '../../../providers/auth/principal.service';
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
  filterTutors: Array<User>=[];
  userInfos: Array<UserInfo>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private toastCtrl: ToastController, private principal: Principal, private userInfoService: UserInfoService,private bookingService:BookingsService) {
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
    this.userService.query().subscribe(
      (response) => {
        response.forEach(user => {
          user.authorities.forEach(authority => {
            if (authority == "ROLE_TUTOR") {
              this.filterTutors = this.filterTutors.concat(user);
            }
          });
        });

      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }

  initUserInfo() {
    this.userInfoService.query().subscribe(
      (response) => {
        this.userInfos=response;
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }

  assignToTutor(tutorId:number)
  {
    if(tutorId!= null || tutorId != undefined)
    {
      this.selectedBooking.adminAcceptedId = tutorId;
    }
    if(this.selectedBooking != null || this.selectedBooking != undefined)
    {
    this.bookingService.saveBooking(this.selectedBooking);
    this.navCtrl.push(homePage);
    }
  }
}
