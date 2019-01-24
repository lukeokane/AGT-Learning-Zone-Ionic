import { UserInfo } from './../../../class/UserInfo';
import { BookingUserDetails } from './../../../class/BookingUserDetails';
import { Booking } from './../../../class/Booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdinalScale } from '../../../class/OrdinalScale';
import { Subject } from '../../../class/Subject';
import { User } from '../../../class/User';
import { SemesterGroup } from '../../../class/SemesterGroup';
import { Topic } from '../../../class/Topic';

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
export class AdminBookingManagementPage {

  menuClicked: boolean = false;
  bookings: Array<Booking>;
  selectedBooking: Booking;
  dayOfWeek:any;  
  time:any;
  selected: any;

 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.bookings = [new Booking(1, "help in Java", "Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00"), "I'm trying to learn the best way to implement interfaces with inheritance for a topic being taught in Object Oriented Programming next week", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Luke O'Kane", new Date("Tue Oct 23 2018 12:00:00"), new Date("Tue Oct 23 2018 13:00:00"), "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard", OrdinalScale.HIGH), new Booking(1, "help in Java", "Marcus Philips", new Date("Wed Oct 24 2018 09:00:00"), new Date("Wed Oct 24 2018 10:00:00"), "Lorem Ipsum sit amit consecteur", OrdinalScale.LOW), new Booking(1, "help in Java", "Farwa Javed", new Date("Tue Oct 23 2018 14:00:00"), new Date("Tue Oct 23 2018 15:00:00"), "it to make a type specimen book. It has survived not only five centuries, but also the leap", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Shaun Conroy", new Date(), new Date(), "Lorem Ipsum sit amit consecteur", OrdinalScale.MEDIUM), new Booking(1, "help in Java", "Thomas Larkin", new Date("Fri Oct 26 2018 16:00:00"), new Date("Fri Oct 26 2018 17:00:00"), "more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", OrdinalScale.HIGH)];
      this.bookings=[new Booking(1,"help in Java","Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00"),"I'm trying to learn the best way to implement interfaces with inheritance for a topic being taught in Object Oriented Programming next week",OrdinalScale.LOW,null,null,null,null,null,null,new Subject(1,null,"Java",[new Topic(1,"OOP")],null,null),[new UserInfo(1,null,new User(1,null,null,"Shaun","Conroy","D001893736"),new SemesterGroup(1,"Group 1",null,[new Subject(1,"Java","Java",[new Topic(1,"Classes",null,null)],null,null)],null,null),null,null,null,null)],null),new Booking(1,"help in Java","Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00")," is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",OrdinalScale.MEDIUM,null,null,null,null,null,null,new Subject(1,null,"Java",null,null,null),[new UserInfo(1,null,new User(1,null,null,"Elaine Pei","Ling Chong","D0018910736"),new SemesterGroup(1,"dd",null,[new Subject(1,"Java","Java",[new Topic(1,"Classes",null,null)],null,null)],null,null),null,null,null,null)],null),new Booking(1,"help in Java","Shaun Conroy", new Date("Tue Oct 23 2018 10:00:00"), new Date("Tue Oct 23 2018 11:00:00"),"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",OrdinalScale.HIGH,null,null,null,null,null,null,new Subject(1,null,"Java",null,null,null),[new UserInfo(1,null,new User(1,null,null,"Luke","O'Kane","D0017209171"),new SemesterGroup(1,"dd",null,[new Subject(1,"Java","Java",[new Topic(1,"Classes",null,null)],null,null)],null,null),null,null,null,null)],null)];
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminBookingManagementPage');
  }

//   setClickedRow(index){
//     this.selectedRow = index;
// }

  goToBooking(booking: Booking) {
    this.selectedBooking = booking;
    this.dayOfWeek= this.selectedBooking.startTime.getDay() ==0 ? "Sunday" : this.selectedBooking.startTime.getDay()==1? "Monday" : this.selectedBooking.startTime.getDay()== 2 ? "Tuesday" : this.selectedBooking.startTime.getDay()== 3 ? "Wednesday" :  this.selectedBooking.startTime.getDay()== 4 ? "Thursday" :  this.selectedBooking.startTime.getDay()== 5 ? "Friday" : this.selectedBooking.startTime.getDay()== 6 ? "Saturday"  : void 0;
  }  

  goToCheckIn()
  {
    this.navCtrl.push("ItlcModalCheckinPage");
  }

}
