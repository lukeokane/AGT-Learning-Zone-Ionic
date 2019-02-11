import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Booking } from '../../class/Booking';
import { Principal } from '../../providers/auth/principal.service';
import { BookingUserDetails } from '../../class/BookingUserDetails';
import { UserInfoService } from '../../services/UserInfo.provider';
import { Subject } from '../../class/Subject';
import { SemesterGroupService } from '../../services/SemesterGroup.provider';
import { Topic } from '../../class/Topic';
import { TopicService } from '../../services/Topic.provider';
import { OrdinalScale } from '../../class/OrdinalScale';
import { UserInfo } from '../../class/UserInfo';
import { Notification } from '../../class/Notification';

/**
 * Generated class for the UserRequestModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-request-modal',
  templateUrl: 'user-request-modal.html',
})
export class UserRequestModalPage implements OnInit {
  dateSelected: Date;
  timeSelected: any;
  booking: Booking;
  userDetails: BookingUserDetails;
  userId: any;
  subjects: Array<Subject>;
  topics: Array<Topic>;
  dateStart: any;
  dateEnd: any;
  ordinalScale: OrdinalScale;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private principal: Principal,
    private userInfoService: UserInfoService,
    // private subjectService: SubjectsService,
    private topicService: TopicService,
    private semesterGroupService: SemesterGroupService) {
    this.dateSelected = this.navParams.get("dateSelected");
    this.timeSelected = this.navParams.get("timeSelected");
    // this.booking.bookingUserDetails
  }
  ngOnInit() {
    this.initBooking();
    this.initUserInfo();
  }
  initBooking() {
    this.booking = new Booking();
    this.userDetails = new BookingUserDetails();
    this.booking.userInfos = new Array<UserInfo>();
    this.booking.tutorAccepted = false;
    this.booking.cancelled = false;
    this.booking.notifications = new Array<Notification>();
    this.booking.readByAdmin = false;
    this.booking.tutorRejectedCount=0;
    this.booking.userComments="";
    let now = new Date();
    this.booking.modifiedTimestamp = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
    console.log(this.booking.modifiedTimestamp.toISOString());
    console.log(this.booking.modifiedTimestamp.toJSON());
    //2019-02-10T22:16:37.213Z
    this.booking.bookingUserDetails = new Array<BookingUserDetails>();
    this.userId = this.principal.getUserId();
    this.booking.importanceLevel = OrdinalScale.NONE;
  }
  initUserInfo(refresher?) {
    this.userInfoService.find(this.userId).subscribe((response) => {
      let userInfo = response;
      this.booking.userInfos.push(userInfo);
      if (typeof (refresher) !== 'undefined') {
        refresher.complete();
      }
      this.userDetails.userInfo = userInfo;
      this.booking.bookingUserDetails.push(this.userDetails);
      var semesterGroupId = userInfo.semesterGroupId;
      this.initSubject(semesterGroupId);
      // semesterGroupId
      // this.subjects = 
    },
      (error) => {
        console.error(error);
        // let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        // toast.present();
      });
  }
  initSubject(semesterGroupId) {
    this.semesterGroupService.find(semesterGroupId).subscribe((response) => {
      this.subjects = response.subjects;
      let subjectsId: number[] = new Array(this.subjects.length)
      for (let i = 0; i < this.subjects.length; i++) {
        subjectsId[i] = this.subjects[i].id;
      }
      this.initTopic(subjectsId);
    }
    )
  }
  initTopic(subjectId) {
    this.topicService.getAllTopicsBySubjectId(subjectId).subscribe((response) => {
      this.topics = response;

    })
  }
  checkDateType(data) {
    console.log("data " + data + "T00:00:00Z");

    //2019-03-10
  }

  convertToString() {
    return "Date: " + this.dateSelected.getDate() + "/" + (this.dateSelected.getMonth() + 1) + " Time:" + this.timeSelected + ":00";
  }

  onClickPriority(position: any) {
    if (position == 1) {
      this.booking.importanceLevel = OrdinalScale.LOW;

    } else if (position == 2) {
      this.booking.importanceLevel = OrdinalScale.MEDIUM;

    } else if (position == 3) {
      this.booking.importanceLevel = OrdinalScale.HIGH;

    }
  }

  onClickContinue() {
    this.booking.subject = this.subjects.find(x => x.id == this.booking.subjectId);
    console.log(this.booking);
    let timeSlotModal = this.modalCtrl.create("UserRequestTimeslotPage", { booking: this.booking, dateStart: this.dateStart, dateEnd: this.dateEnd, dateSelected: this.dateSelected, timeSelected: this.timeSelected });
    timeSlotModal.onDidDismiss(data => {
      this.viewCtrl.dismiss(data);

    });
    timeSlotModal.present();
  }
  onClickCancel(){
    this.viewCtrl.dismiss();

  }
}
