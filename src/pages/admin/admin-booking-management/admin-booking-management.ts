import { SubjectsService } from './../../../services/Subject.provider';
import { SemesterGroupService } from './../../../services/SemesterGroup.provider';
import { SemesterGroup } from './../../../class/SemesterGroup';
import { UserService } from './../../../services/User.provider';
import { HttpResponse } from '@angular/common/http';
import { BookingsService } from './../../../services/Booking.provider';
import { adminBookingAssignnPage } from './../../pages';
import { Booking } from './../../../class/Booking';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../../class/User';
import { Subject } from '../../../class/Subject';


/**
 * Generated class for the AdminBookingManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private bookingsService: BookingsService, private toastCtrl: ToastController, private userService: UserService, private semesterGroupService: SemesterGroupService, private subjectService: SubjectsService) {
    // this.bookings=[new Booking(1,"help in Java","Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00"),"I'm trying to learn the best way to implement interfaces with inheritance for a topic being taught in Object Oriented Programming next week",OrdinalScale.LOW,null,null,null,null,null,null,new Subject(1,null,"Java",[new Topic(1,"OOP")],null,null),[new UserInfo(1,null,new User(1,null,null,"Shaun","Conroy","D001893736"),new SemesterGroup(1,"Group 1",null,[new Subject(1,"Java","Java",[new Topic(1,"Classes",null,null)],null,null)],null,null),null,null,null,null)],null),new Booking(1,"help in Java","Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00")," is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",OrdinalScale.MEDIUM,null,null,null,null,null,null,new Subject(1,null,"Java",null,null,null),[new UserInfo(1,null,new User(1,null,null,"Elaine Pei","Ling Chong","D0018910736"),new SemesterGroup(1,"dd",null,[new Subject(1,"Java","Java",[new Topic(1,"Classes",null,null)],null,null)],null,null),null,null,null,null)],null),new Booking(1,"help in Java","Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00"),"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",OrdinalScale.HIGH,null,null,null,null,null,null,new Subject(1,null,"Java",null,null,null),[new UserInfo(1,null,new User(1,null,null,"Luke","O'Kane","D0017209171"),new SemesterGroup(1,"dd",null,[new Subject(1,"Java","Java",[new Topic(1,"Classes",null,null)],null,null)],null,null),null,null,null,null)],null)];
  }

  ngOnInit() {
    this.initBooking();
    this.initUsersInfo();
    this.initSemesterGroup();
    this.initSubjects();
  }

  initBooking(refresher?) {
    this.itemsPerPage = 30;

    this.bookingsService.findBookingsPendingAdminApproval({
      page: this.page - 1,
      size: this.itemsPerPage
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

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.bookings = data;
    console.log("Bookings", this.bookings);
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

  onSuccess1(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.semesterGroups = data;
    // console.log("SemesterGroup", this.semesterGroups);
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

  onSuccess3(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.subjects = data;
    // console.log("Subjects", this.subjects);
  }

  goToBooking(booking: Booking) {
    this.selectedBooking = booking;
    // this.dayOfWeek= this.selectedBooking.startTime.getDay() ==0 ? "Sunday" : this.selectedBooking.startTime.getDay()==1? "Monday" : this.selectedBooking.startTime.getDay()== 2 ? "Tuesday" : this.selectedBooking.startTime.getDay()== 3 ? "Wednesday" :  this.selectedBooking.startTime.getDay()== 4 ? "Thursday" :  this.selectedBooking.startTime.getDay()== 5 ? "Friday" : this.selectedBooking.startTime.getDay()== 6 ? "Saturday"  : void 0;
  }

  goToAssignTutorManually() {
    this.navCtrl.push(adminBookingAssignnPage);
  }

}
