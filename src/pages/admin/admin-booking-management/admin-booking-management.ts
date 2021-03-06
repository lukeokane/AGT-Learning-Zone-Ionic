import { SubjectsService } from './../../../services/Subject.provider';;
import { UserService } from './../../../services/User.provider';
import { HttpResponse } from '@angular/common/http';
import { BookingsService } from './../../../services/Booking.provider';
import { adminBookingAssignPage, adminEditBooking, adminAddBookingPage, adminCancelBookingPage } from './../../pages';
import { Booking } from './../../../class/Booking';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { User } from '../../../class/User';
import { Subject } from '../../../class/Subject';
import { BookingDetails } from '../../../class/BookingDetails';
import { Principal } from '../../../providers/auth/principal.service';

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
  constructor(public navCtrl: NavController,
    private principal: Principal,
    public navParams: NavParams, private bookingsService: BookingsService, private toastCtrl: ToastController, private userService: UserService, private subjectService: SubjectsService, private bookingService: BookingsService, private modalCtrl: ModalController) {
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
      console.log(this.findUserBookings);
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
  convertStringDate() {
    return this.selectedBooking.startTime.substring(0, 10) + " " + this.selectedBooking.startTime.substring(11, 16) + " - " + this.selectedBooking.endTime.substring(11, 16);
  }
  goToBooking(booking: Booking) {
    this.startTime=null;
    let timeArray = [];
    let filter = [];
    this.FortmattedDates = [];
    this.selectedBooking = booking;
    console.log(this.selectedBooking);
    // if(this.selectedBooking.startTime!=null && this.selectedBooking.startTime!=undefined){
    //   this.selectedBooking.startTime  =new Date(this.selectedBooking.startTime);
    //   this.selectedBooking.endTime  =new Date(this.selectedBooking.endTime);

    // }
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


  goToEditBooking(selectedBooking: Booking) {
    let modal = this.modalCtrl.create(adminEditBooking, {
      selectedBooking: selectedBooking
    });
    modal.present();
    modal.onDidDismiss(data => {
      console.log("back");
      console.log(data);
      if (data != null && data != undefined) {
        this.selectedBooking = data.booking;

      }
    })
    // this.navCtrl.push(adminEditBooking, {
    //   selectedBooking: selectedBooking
    // });
  }

  goToCancelBooking(selectedBooking: Booking) {
    let tag: string = "rejectBooking";
    let cancelModal = this.modalCtrl.create(adminCancelBookingPage, { selectedBooking: selectedBooking, tag: tag });
    cancelModal.present();
  }

  onAddBooking() {
    let bookingModal = this.modalCtrl.create(adminAddBookingPage);
    bookingModal.onDidDismiss(data => {

    });
    bookingModal.present();
  }


  getScreenSize() {
    return window.innerWidth;
  }
  goToAcceptBooking() {

    this.selectedBooking.adminAcceptedId = Number(this.principal.getUserId());
    this.selectedBooking.startTime = this.startTime.toISOString();
    this.selectedBooking.endTime = this.endTime.toISOString();

    if (this.selectedBooking != null || this.selectedBooking != undefined) {
      let bookingDetails = new BookingDetails();
      bookingDetails.message = null
      bookingDetails.booking = this.selectedBooking;
      this.bookingService.updateBooking(bookingDetails).subscribe(data => {
        console.log(data);
      }, (erro) => {
        console.error(erro);
      });
    }
  }
}
