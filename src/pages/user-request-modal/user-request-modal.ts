import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Booking } from '../../class/Booking';
import { Principal } from '../../providers/auth/principal.service';
import { UserInfoService } from '../../services/UserInfo.provider';
import { Subject } from '../../class/Subject';
import { Topic } from '../../class/Topic';
import { TopicService } from '../../services/Topic.provider';
import { OrdinalScale } from '../../class/OrdinalScale';
import { UserInfo } from '../../class/UserInfo';
import { Notification } from '../../class/Notification';
import { AvailableTime } from '../../class/AvailableTime';
import { BookingUserDetails } from '../../class/BookingUserDetails';
import { SubjectsService } from '../../services/Subject.provider';
import { CourseYearService } from '../../services/CourseYear.provider';
import { CourseYear } from '../../class/CourseYear';

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
  s1: Date;
  s2: any;
  booking: Booking;
  userId: any;
  userCourseYear: any;
  userCourse: any;
  courseYears: Array<CourseYear>;
  subjects: Array<Subject>;
  topics: Array<Topic>;
  dateStart: any;
  dateEnd: any;
  ordinalScale: OrdinalScale;
  selectedTopic: any;
  bookings: Array<any>;
  availableTimes: Array<{ date: Date, time: Array<AvailableTime> }>;
  minDate;
  maxDate
  dateEndMinDate;
  dateEndMaxDate;
  selectedYear;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private principal: Principal,
    private userInfoService: UserInfoService,
    private courseYearService: CourseYearService,
    private topicService: TopicService) {
    this.availableTimes = new Array();
    this.s1 = this.navParams.get("s1");
    this.s2 = this.navParams.get("s2");
    this.bookings = this.navParams.get("bookings");
    this.selectedTopic = new Array();
    this.minDate = new Date().toISOString();
    this.maxDate = this.getDateAfterDay(new Date(), 14).toISOString();
    this.dateEndMaxDate = this.getDateAfterDay(new Date(), 14).toISOString();
    this.dateEndMinDate = new Date().toISOString();
    this.courseYears = new Array();

  }
  ngOnInit() {
    this.initBooking();
    this.initUserInfo();
  }
  initBooking() {
    this.booking = new Booking();
    this.booking.userInfos = new Array<UserInfo>();
    this.booking.tutorAccepted = false;
    this.booking.cancelled = false;
    this.booking.notifications = new Array<Notification>();
    this.booking.readByAdmin = false;
    this.booking.tutorRejectedCount = 0;
    this.booking.userComments = "";
    this.booking.topics = new Array<Topic>();
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
  changeStartDate() {
    this.dateEndMinDate = this.dateStart;
    this.dateEndMaxDate = this.getDateAfterDay(new Date(this.dateStart), 14).toISOString();
    this.dateEnd = "";
  }
  initUserInfo(refresher?) {
    this.userInfoService.find(this.userId).subscribe((response) => {
      let userInfo = response;
      this.booking.userInfos.push(userInfo);
      this.booking.requestedBy = this.principal.userIdentity.firstName + " " + this.principal.userIdentity.lastName;
      if (typeof (refresher) !== 'undefined') {
        refresher.complete();
      }
      this.userCourseYear = userInfo.courseYearId

      this.initYear();
      // this.initSubject();
    },
      (error) => {
        console.error(error);
        // let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        // toast.present();
      });
  }
  initYear() {
    this.courseYearService.find(this.userCourseYear).subscribe((response) => {
      this.subjects = response.subjects;
      this.userCourse = response.courseId;

      let subjectsId: number[] = new Array(this.subjects.length)
      for (let i = 0; i < this.subjects.length; i++) {
        subjectsId[i] = this.subjects[i].id;
      }
      this.initTopic(subjectsId);

    });
    this.courseYearService.query().subscribe((response: Array<CourseYear>) => {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        if (response[i].courseId == this.userCourse) {
          this.courseYears.push(response[i]);
        }
      }

      // let subjectsId: number[] = new Array(this.subjects.length)
      // for (let i = 0; i < this.subjects.length; i++) {
      //   subjectsId[i] = this.subjects[i].id;
      // }
      // this.initTopic(subjectsId);
    }
    );
  }
  // initSubject() {
  //   this.subjectsService.query().subscribe((response) => {
  //     console.log(response);
  //     this.subjects = response;
  //     let subjectsId: number[] = new Array(this.subjects.length)
  //     for (let i = 0; i < this.subjects.length; i++) {
  //       subjectsId[i] = this.subjects[i].id;
  //     }
  //     this.initTopic(subjectsId);
  //   }
  //   )
  // }
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
  onSubjectChange() {
    if (this.booking.subjectId != -1) {
      this.booking.subject = this.subjects.find(x => x.id == this.booking.subjectId);
      console.log(this.booking.subject);
      this.topics = this.booking.subject.topics;
      this.booking.topics = new Array();
    } else {
      this.topics = new Array();
      this.booking.topics = new Array();
    }

  }
  onYearChange() {
    this.courseYearService.find(this.selectedYear).subscribe((response) => {
      this.subjects = response.subjects;
    });
  }
  onClickContinue() {
    this.initAvailableTime();

    this.booking.subject = this.subjects.find(x => x.id == this.booking.subjectId);
    this.booking.title = this.booking.subject.title;
    console.log(this.booking.subject);

    let timeSlotModal = this.modalCtrl.create("UserRequestTimeslotPage", { booking: this.booking, dateStart: this.dateStart, dateEnd: this.dateEnd, availableTimes: this.availableTimes });
    timeSlotModal.onDidDismiss(data => {
      console.log(data);
      if (data != undefined && data != null) {
        if (data.send != undefined && data.send != null) {
          this.viewCtrl.dismiss({ send: data.send, booking: data.booking });
        }
      }
      else
        this.viewCtrl.dismiss();
    });
    timeSlotModal.present();
  }
  onClickCancel() {
    this.viewCtrl.dismiss();
  }
  initAvailableTime() {
    this.availableTimes = new Array();
    let at = new AvailableTime(new Date(this.s1), new Date(this.s2));
    this.availableTimes.push({ date: new Date(this.s1), time: [at] });
    // this.dateStart = "2019-02-18T00:00:00Z";
    // this.dateEnd = "2019-02-20T00:00:00Z";

    let d1 = new Date(this.dateEnd);
    d1.setTime((d1.getTime() + (1000 * 60 * 60 * 24)));
    let d3 = new Date(this.dateStart);
    let day = d3.getDay();
    d3.setUTCHours(9);
    let hr = d3.getUTCHours() - 1;
    let added = true;
    while (!(d1.getUTCFullYear() == d3.getUTCFullYear() && d1.getUTCMonth() == d3.getUTCMonth() && d1.getUTCDate() == d3.getUTCDate())) {
      // while (exit < 20) {
      if (added == true) {
        hr++;
      }
      d3.setUTCHours(hr);
      let availableTime: AvailableTime = new AvailableTime();
      if ((hr >= 9 && hr <= 17) && (day != 6 && day != 0)) {
        if (this.bookings != undefined && this.bookings != null) {
          if (!(this.bookings.some((value, index, array) => {
            return typeof (value.booking.startTime) == "string" ? value.booking.startTime.substring(0, 19) == d3.toISOString().substring(0, 19) : value.booking.startTime.toISOString() == d3.toISOString().substring(0, 19);
          }))) {
            console.log(d3.toISOString().substring(0, 19));
            console.log(this.availableTimes[0].date.toISOString().substring(0, 19));
            if (d3.toISOString().substring(0, 19) != this.availableTimes[0].date.toISOString().substring(0, 19)) {
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
            } else {
              added = true;
            }
          }
          else {
            added = true;
          }

        }

      }
      else {
        d3.setTime((d3.getTime() + (1000 * 60 * 60 * 24)));
        day = d3.getDay();
        d3.setUTCHours(9);
        added = false;
        hr = d3.getUTCHours();
      }

    }
  }
  checkValid() {
    let invalid = false;
    if (this.booking.subjectId != -1 && this.booking.topics.length == 0) {
      invalid = true;
    }
    return invalid || this.booking.subjectId == null || this.booking.subjectId == undefined || this.dateStart == null || this.dateStart == "" || this.dateStart == undefined || this.dateEnd == null || this.dateEnd == undefined || this.dateEnd == "";
  }
  getDateAfterDay(date, noOfDay) {
    var answer = new Date(date.getTime() + noOfDay * 24 * 60 * 60 * 1000);
    return answer;
  }
}
