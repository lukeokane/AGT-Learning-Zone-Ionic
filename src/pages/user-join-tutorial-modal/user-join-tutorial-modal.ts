import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BookingsService } from '../../services/Booking.provider';
import { Booking } from '../../class/Booking';
import { Principal } from '../../providers/auth/principal.service';
import { UserInfoService } from '../../services/UserInfo.provider';
import { UserInfo } from '../../class/UserInfo';

/**
 * Generated class for the UserJoinTutorialModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-join-tutorial-modal',
  templateUrl: 'user-join-tutorial-modal.html',
})
export class UserJoinTutorialModalPage {
  userId: any;
  booking: Booking;
  userInfo: UserInfo;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private bookingsService: BookingsService,
    private principal: Principal,
    private userInfoService: UserInfoService, ) {
    if (this.navParams.get("booking") == undefined || this.navParams.get("booking") == null) {
      this.viewCtrl.dismiss();
    } else {
      this.booking = this.navParams.get("booking");
      if (this.booking.userInfos == null || this.booking.userInfos == undefined) {
        this.booking.userInfos = new Array();
      }
    }

  }
  ngOnInit() {
    this.initUserInfo();
    this.initBooking();
  }
  initBooking() {
    this.bookingsService.getBooking(this.booking.id).subscribe((response) => {
      this.booking=response;
    },
      (error) => {
        console.error(error);
      });
  }
  initUserInfo() {
    this.userId = this.principal.getUserId();
    this.userInfoService.find(this.userId).subscribe((response) => {
      this.userInfo = response;
    },
      (error) => {
        console.error(error);
      });
  }
  onClickRequest() {
    this.booking.userInfos.push(this.userInfo);
    this.bookingsService.update(this.booking).subscribe(data => {
      this.viewCtrl.dismiss({ send: true });
    }, (error) => {
      console.error(error);
      this.viewCtrl.dismiss({ send: false });

    })
  }
  onClickCancel() {
    this.viewCtrl.dismiss();
  }
  getNoStudent() {
    return this.booking.userInfos.length == 0 ? 1 : this.booking.userInfos.length;

  }
  checkBooked() {
    return this.booking.userInfos.some(value => {
      return value.userId == this.userId;
    })
  }
}
