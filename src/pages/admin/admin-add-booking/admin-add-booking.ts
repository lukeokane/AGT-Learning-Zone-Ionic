import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Booking } from '../../../class/Booking';
import { UserInfo } from '../../../class/UserInfo';
import { Topic } from '../../../class/Topic';
import { BookingUserDetails } from '../../../class/BookingUserDetails';
import { OrdinalScale } from '../../../class/OrdinalScale';
import { Principal } from '../../../providers/auth/principal.service';
import { CourseYearService } from '../../../services/CourseYear.provider';
import { CourseYear } from '../../../class/CourseYear';
import { Subject } from '../../../class/Subject';
import { TopicService } from '../../../services/Topic.provider';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';

@IonicPage()
@Component({
  selector: 'page-admin-add-booking',
  templateUrl: 'admin-add-booking.html',
})
export class AdminAddBookingPage {

  timeStart: any;
  timeEnd: any;
  dateEndMinDate;
  minTime;
  minDate;
  date: any;
  booking: Booking;
  userId: any;
  courses: Array<Course>;
  courseYears: Array<CourseYear>;
  subjects: Array<Subject>;
  topics: Array<Topic>;
  selectedCourse: number;
  selectedYear: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private principal: Principal,
    private courseYearService: CourseYearService,
    private courseService: CourseService,
    private topicService: TopicService,
    private viewCtrl: ViewController) {
    this.date = new Date().toISOString();
    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate()+1);
    this.minDate = tomorrow.toISOString();
    // this.minTime = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddBookingPage');
  }
  changeStartDate() {
    console.log(this.timeStart);
    this.dateEndMinDate = this.timeStart;
    this.timeEnd = "";
  }
  onCourseChange() {
    this.courseYears = this.courses[this.selectedCourse].courseYears;
  }
  onYearChange() {
    this.subjects = this.courseYears[this.selectedYear].subjects;
  }
  onSubjectChange() {
    if (this.booking.subjectId != -1) {
      this.booking.subject = this.subjects.find(x => x.id == this.booking.subjectId);
      this.topics = this.booking.subject.topics;
      this.booking.topics = new Array();
    } else {
      this.topics = new Array();
      this.booking.topics = new Array();
    }
  }
  ngOnInit() {
    this.initBooking();
    this.initYear();
  }

  initBooking() {
    this.booking = new Booking();
    this.booking.userInfos = new Array<UserInfo>();
    this.booking.tutorAccepted = false;
    this.booking.readByAdmin=true;
    this.booking.cancelled = false;
    // this.booking.notifications = new Array<Notification>();
    this.booking.readByAdmin = false;
    this.booking.tutorRejectedCount = 0;
    this.booking.userComments = "";
    this.booking.topics = new Array<Topic>();
    let now = new Date();
    this.booking.modifiedTimestamp = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
    //2019-02-10T22:16:37.213Z
    this.booking.bookingUserDetails = new Array<BookingUserDetails>();
    // this.userId = this.principal.getUserId();
    this.booking.importanceLevel = OrdinalScale.NONE;
    this.booking.startTime = new Date(1970, 1, 1, 0, 0, 0, 0);
    this.booking.endTime = new Date(1970, 1, 1, 0, 0, 0, 0);
    this.booking.modifiedTimestamp = new Date();
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
  onClickCancel() {
    this.viewCtrl.dismiss();
  }
  onCreateBooking() {
    this.booking.startTime  = this.date.substring(0, 11)+this.timeStart+":00Z";
    this.booking.endTime  = this.date.substring(0, 11)+this.timeEnd+":00Z";

  }
  checkValid() {
    return false;
  }
  initTopic(subjectId) {
    this.topicService.getAllTopicsBySubjectId(subjectId).subscribe((response) => {
      this.topics = response;

    })
  }
  initYear() {
    this.courseService.query().subscribe((response) => {
      this.courses = response;
    });
  }
}
