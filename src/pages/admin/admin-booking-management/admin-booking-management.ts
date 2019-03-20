import { SubjectsService } from './../../../services/Subject.provider';;
import { UserService } from './../../../services/User.provider';
import { HttpResponse } from '@angular/common/http';
import { BookingsService } from './../../../services/Booking.provider';
import { adminBookingAssignPage,adminEditBooking } from './../../pages';
import { Booking } from './../../../class/Booking';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../../class/User';
import { Subject } from '../../../class/Subject';

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
  subjects: Array<Subject>;
  predicate: any = 'id';
  previousPage: any;
  reverse: any;
  filterTutors: Array<User> = [];
  FortmattedDates: any = [];
  value: any;
  startTime: any;
  endTime: any;
  result = [];
  empty:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bookingsService: BookingsService, private toastCtrl: ToastController, private userService: UserService, private subjectService: SubjectsService, private bookingService: BookingsService) {
  }

  ngOnInit() {
    this.initBooking();
    this.initUsersInfo();
  }

  initBooking() {
    this.itemsPerPage = 20;
    this.bookingsService.getAllBookingsPageable({
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
    this.findUserBookings = [];
    this.userService.query().subscribe((response) => {
      this.findUserBookings = response;
    })
  }

  initSubjects(subjectId: any) {
    this.subjects = [];
    if (subjectId != null || subjectId != undefined) {
      this.subjectService.find(subjectId).subscribe((response) => {
        this.subjects.push(response);
        this.subjects = this.subjects.filter(function (a) {
          return !this[a.id] && (this[a.id] = true);
        }, Object.create(null));
      })
    }
  }

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.bookings = data;
    console.log("Bookings ", this.bookings);

    this.bookings.forEach(booking => {
      this.initSubjects(booking.subjectId);
      booking.userInfos.forEach(userInfo => {
        // this.initSemesterGroup(userInfo.semesterGroupId);
      });
    });
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

  getTimes(event: any) {
    this.startTime = event;
    this.FortmattedDates = this.FortmattedDates.sort((a, b) => a - b); // For ascending sort
    for (let i = 0; i < this.FortmattedDates.length; i++) {
      if (this.FortmattedDates[i] == event) {
        this.endTime = this.FortmattedDates[i + 1];
      }
    }
  }

  goToBooking(booking: Booking) {
    let timeArray = [];
    let filter = [];
    this.FortmattedDates = [];
    this.selectedBooking = booking;
    if (this.selectedBooking.readByAdmin == false) {
      booking.readByAdmin = true;
      this.bookingService.saveBooking(booking);
    }
    this.time = this.selectedBooking.requestTimes;
    if (this.time != null || this.time != undefined) {
      timeArray = this.time.split("&");
      timeArray.forEach(times => {
        times = times.split("|");
        filter = filter.concat(times);
      });
    }
    filter.forEach(element => {
      this.FortmattedDates = this.FortmattedDates.concat(new Date(element));
    });
  }

  goToAssignTutorManually(selectedBooking: Booking) {
    if (this.startTime != null || this.startTime != undefined) {
      selectedBooking.startTime = this.startTime.toISOString();
    }
    if (this.endTime != null || this.endTime != undefined) {
      selectedBooking.endTime = this.endTime.toISOString();
    }
    this.navCtrl.push(adminBookingAssignPage, {
      selectedBooking: selectedBooking
    });
  }


  goToEditBooking(selectedBooking: Booking){
    this.navCtrl.push(adminEditBooking, {
      selectedBooking: selectedBooking
    });
  }
  goToRejectBooking(selectedBooking: Booking){
    //call api
  }

}
