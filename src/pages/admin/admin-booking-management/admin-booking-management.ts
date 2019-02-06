import { SubjectsService } from './../../../services/Subject.provider';
import { SemesterGroupService } from './../../../services/SemesterGroup.provider';
import { SemesterGroup } from './../../../class/SemesterGroup';
import { UserService } from './../../../services/User.provider';
import { HttpResponse } from '@angular/common/http';
import { BookingsService } from './../../../services/Booking.provider';
import { homePage, adminBookingAssignPage } from './../../pages';
import { Booking } from './../../../class/Booking';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../../class/User';
import { Subject } from '../../../class/Subject';
import { UserInfo } from '../../../class/UserInfo';
import { UserInfoService } from '../../../services/UserInfo.provider';

@IonicPage()
@Component({
  selector: 'page-admin-booking-management',
  templateUrl: 'admin-booking-management.html',
})
export class AdminBookingManagementPage implements OnInit {

  menuClicked: boolean = false;
  bookings: Array<Booking>;
  selectedBooking: Booking;
  dayOfWeek: any;
  time: any;
  selected: any;
  itemsPerPage: any;
  page: number;
  totalItems: any;
  queryCount: any;
  findUserBookings: Array<User>;
  semesterGroups: Array<SemesterGroup>;
  subjects: Array<Subject>;
  predicate: any = 'id';
  previousPage: any;
  reverse: any;
  userInfos: Array<UserInfo>;
  filterTutors: Array<User> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private bookingsService: BookingsService, private toastCtrl: ToastController, private userService: UserService, private semesterGroupService: SemesterGroupService, private subjectService: SubjectsService, private userInfoService: UserInfoService, private bookingService: BookingsService) {
  }

  ngOnInit() {
    this.initBooking();
    this.initUsersInfo();
    this.initUserInfo();
    this.initSemesterGroup();
    this.initSubjects();
  }

  initBooking(refresher?) {
    this.itemsPerPage = 4;
    this.bookingsService.findBookingsPendingAdminApproval({
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    }).subscribe(
      (res: HttpResponse<Booking[]>) => {
        this.onSuccess(res.body, res.headers)
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }

  initUsersInfo() {
    this.userService.query().subscribe(
      (response) => {
        this.findUserBookings = response;
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }

  initSemesterGroup() {
    this.itemsPerPage = 64;
    this.semesterGroupService.query1({
      page: this.page - 1,
      size: this.itemsPerPage
    }).subscribe(
      (res: HttpResponse<SemesterGroup[]>) => {
        this.onSuccess1(res.body, res.headers)
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }


  initSubjects() {
    this.itemsPerPage = 125;
    this.subjectService.query1({
      page: this.page - 1,
      size: this.itemsPerPage
    }).subscribe(
      (res: HttpResponse<Subject[]>) => {
        this.onSuccess3(res.body, res.headers)
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
        this.userInfos = response;
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.bookings = data;

    // console.log("Bookings", this.bookings);
  }

  onSuccess1(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.semesterGroups = data;
    // console.log("SemesterGroup", this.semesterGroups);
  }

  onSuccess3(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.subjects = data;
    // console.log("Subjects", this.subjects);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.initBooking();
    }
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  goToBooking(booking: Booking) {
    this.selectedBooking = booking;
    // this.dayOfWeek= this.selectedBooking.startTime.getDay() ==0 ? "Sunday" : this.selectedBooking.startTime.getDay()==1? "Monday" : this.selectedBooking.startTime.getDay()== 2 ? "Tuesday" : this.selectedBooking.startTime.getDay()== 3 ? "Wednesday" :  this.selectedBooking.startTime.getDay()== 4 ? "Thursday" :  this.selectedBooking.startTime.getDay()== 5 ? "Friday" : this.selectedBooking.startTime.getDay()== 6 ? "Saturday"  : void 0;
  }

  goToAssignTutorManually(selectedBooking: Booking) {
    this.navCtrl.push(adminBookingAssignPage, {
      selectedBooking: selectedBooking
    });
  }

  assignTutorRandomly(selectedBooking: Booking) {
    this.userService.query().subscribe(
      (response) => {
        response.forEach(user => {
          user.authorities.forEach(authority => {
            if (authority == "ROLE_TUTOR") {
              this.filterTutors = this.filterTutors.concat(user);
            }
          });
        });
        this.assignToTutor(selectedBooking, this.filterTutors);
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });

  }

  assignToTutor(selectedBooking: Booking, filterTutors: Array<User> = []) 
  {
    let rand = filterTutors[Math.floor(Math.random() * filterTutors.length)];
    if (rand != null || rand != undefined) {
      selectedBooking.adminAcceptedId = rand.id;
    }
    if (selectedBooking != null || selectedBooking != undefined) {
      this.bookingService.saveBooking(selectedBooking);
      this.navCtrl.push(homePage);
    }
  }


}
