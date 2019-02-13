import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, List } from 'ionic-angular';
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
import { AvailableTime } from '../../class/AvailableTime';

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
  selectedTopic: any;
  bookings: Array<any>;
  availableTimes: Array<{ date: Date, time: Array<AvailableTime> }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private principal: Principal,
    private userInfoService: UserInfoService,
    // private subjectService: SubjectsService,
    private topicService: TopicService,
    private semesterGroupService: SemesterGroupService) {
    this.availableTimes = new Array();
    this.dateSelected = this.navParams.get("dateSelected");
    this.timeSelected = this.navParams.get("timeSelected");
    this.bookings = this.navParams.get("bookings");
    // this.booking.bookingUserDetails
  }
  ngOnInit() {
    this.initBooking();
    this.initUserInfo();
    // this.initAvailableTime();
  }
  initBooking() {
    this.booking = new Booking();
    this.userDetails = new BookingUserDetails();
    this.booking.userInfos = new Array<UserInfo>();
    this.booking.tutorAccepted = false;
    this.booking.cancelled = false;
    this.booking.notifications = new Array<Notification>();
    this.booking.readByAdmin = false;
    this.booking.tutorRejectedCount = 0;
    this.booking.userComments = "";
    let now = new Date();
    this.booking.modifiedTimestamp = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
    // console.log(this.booking.modifiedTimestamp.toISOString());
    // console.log(this.booking.modifiedTimestamp.toJSON());
    //2019-02-10T22:16:37.213Z
    this.booking.bookingUserDetails = new Array<BookingUserDetails>();
    this.userId = this.principal.getUserId();
    this.booking.importanceLevel = OrdinalScale.NONE;
    this.booking.startTime = new Date(1970, 1, 1, 0, 0, 0, 0);
    this.booking.endTime = new Date(1970, 1, 1, 0, 0, 0, 0);
    this.booking.modifiedTimestamp = new Date();
  }
  initUserInfo(refresher?) {
    this.userInfoService.find(this.userId).subscribe((response) => {
      let userInfo = response;
      this.booking.userInfos.push(userInfo);
      console.log(this.principal.userIdentity);
      this.booking.requestedBy = this.principal.userIdentity.firstName + " " + this.principal.userIdentity.lastName;
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
    this.initAvailableTime();
    let sTopic = "";
    this.topics.forEach(value => {
      sTopic = sTopic + value.title + " ";
    })
    this.booking.subject = this.subjects.find(x => x.id == this.booking.subjectId);
    this.booking.title = this.booking.subject.title + " - " + sTopic;
    let timeSlotModal = this.modalCtrl.create("UserRequestTimeslotPage", { booking: this.booking, dateStart: this.dateStart, dateEnd: this.dateEnd, availableTimes: this.availableTimes });
    timeSlotModal.onDidDismiss(data => {
      this.viewCtrl.dismiss({ send: data.send, booking: data.booking });

    });
    timeSlotModal.present();
  }
  onClickCancel() {
    this.viewCtrl.dismiss();

  }
  // initAvailableTime() {
  //   let s = this.dateSelected.toISOString().substring(0, 10) + "T" + this.timeSelected + ":00:00Z";
  //   var timeInt = this.timeSelected;
  //   var time = "" + (timeInt + 1);
  //   if (timeInt < 10) {
  //     time = "0" + timeInt + "";
  //   }
  //   let s2 = this.dateSelected.toISOString().substring(0, 10) + "T" + time + ":00:00Z";

  //   let at = new AvailableTime(new Date(s), new Date(s2));
  //   this.availableTimes.push(at);
  //   this.dateStart = "2019-02-18T00:00:00Z";
  //   this.dateEnd = "2019-02-20T00:00:00Z";

  //   let d1 = new Date(this.dateEnd);
  //   d1.setTime((d1.getTime() + (1000 * 60 * 60 * 24)));
  //   let d3 = new Date(this.dateStart);
  //   let day = d3.getDay();
  //   d3.setUTCHours(9);
  //   let hr = d3.getUTCHours() - 1;
  //   let exit = 0;
  //   let added = true;
  //   while (!(d1.getUTCFullYear() == d3.getUTCFullYear() && d1.getUTCMonth() == d3.getUTCMonth() && d1.getUTCDate() == d3.getUTCDate())) {
  //   // while (exit < 20) {
  //     if (added == true) {
  //       hr++;
  //     }
  //     d3.setUTCHours(hr);
  //     let availableTime: AvailableTime = new AvailableTime();
  //     if ((hr >= 9 && hr <= 18) && (day != 6 && day != 0)) {
  //       if (!(this.bookings.some((value, index, array) => {
  //         return typeof (value.booking.startTime) == "string" ? value.booking.startTime.substring(0, 19) == d3.toISOString().substring(0, 19) : value.booking.startTime.toISOString() == d3.toISOString().substring(0, 19);
  //       }))) {
  //         let temp = new Date(d3.toISOString());
  //         availableTime.startTime = temp;
  //         hr++;
  //         added = false;
  //         d3.setUTCHours(hr);
  //         let temp2 = new Date(d3.toISOString());
  //         availableTime.endTime = temp2;
  //         this.availableTimes.push(availableTime);
  //       }
  //       else {
  //         added = true;
  //       }


  //     }
  //     else {
  //       d3.setTime((d3.getTime() + (1000 * 60 * 60 * 24)));
  //       day = d3.getDay();
  //       d3.setUTCHours(9);
  //       added = false;
  //       hr = d3.getUTCHours();
  //     }
  //     exit++;


  //   }
  //   console.log(this.availableTimes);

  // }
  initAvailableTime() {
    var timeS1 = "" + this.timeSelected;
    if (this.timeSelected < 10) {
      timeS1 = "0" + this.timeSelected + "";
    }
    let s = this.dateSelected.toISOString().substring(0, 10) + "T" + timeS1 + ":00:00Z";
    var timeInt = this.timeSelected;
    var time = "" + (timeInt + 1);
    if (timeInt < 10) {
      time = "0" + timeInt + "";
    }
    let s2 = this.dateSelected.toISOString().substring(0, 10) + "T" + time + ":00:00Z";
    let at = new AvailableTime(new Date(s), new Date(s2));
    this.availableTimes.push({ date: new Date(s), time: [at] });
    // this.dateStart = "2019-02-18T00:00:00Z";
    // this.dateEnd = "2019-02-20T00:00:00Z";

    let d1 = new Date(this.dateEnd);
    d1.setTime((d1.getTime() + (1000 * 60 * 60 * 24)));
    let d3 = new Date(this.dateStart);
    let day = d3.getDay();
    d3.setUTCHours(9);
    let hr = d3.getUTCHours() - 1;
    let exit = 0;
    let added = true;
    while (!(d1.getUTCFullYear() == d3.getUTCFullYear() && d1.getUTCMonth() == d3.getUTCMonth() && d1.getUTCDate() == d3.getUTCDate())) {
      // while (exit < 20) {
      if (added == true) {
        hr++;
      }
      d3.setUTCHours(hr);
      let availableTime: AvailableTime = new AvailableTime();
      if ((hr >= 9 && hr <= 18) && (day != 6 && day != 0)) {
        if (!(this.bookings.some((value, index, array) => {
          return typeof (value.booking.startTime) == "string" ? value.booking.startTime.substring(0, 19) == d3.toISOString().substring(0, 19) : value.booking.startTime.toISOString() == d3.toISOString().substring(0, 19);
        }))) {
          let temp = new Date(d3.toISOString());
          availableTime.startTime = temp;
          hr++;
          added = false;
          d3.setUTCHours(hr);
          let temp2 = new Date(d3.toISOString());
          availableTime.endTime = temp2;
          if (this.availableTimes[this.availableTimes.length - 1].date.toISOString().substring(0, 10) != availableTime.startTime.toISOString().substring(0, 10)) {
            this.availableTimes.push({ date: availableTime.startTime, time: [availableTime] });
          } else {
            this.availableTimes[this.availableTimes.length - 1].time.push(availableTime);
          }
        }
        else {
          added = true;
        }


      }
      else {
        d3.setTime((d3.getTime() + (1000 * 60 * 60 * 24)));
        day = d3.getDay();
        d3.setUTCHours(9);
        added = false;
        hr = d3.getUTCHours();
      }
      exit++;


    }
    console.log(this.availableTimes);

  }
}
