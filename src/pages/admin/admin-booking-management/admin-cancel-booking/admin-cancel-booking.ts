import { BookingDetails } from './../../../../class/BookingDetails';
import { Booking } from './../../../../class/Booking';
import { MessagesService } from './../../../../services/Message.provider';
import { Message } from './../../../../class/Message';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BookingsService } from '../../../../services/Booking.provider';
import { adminBookingManagementPage } from '../../../pages';

@IonicPage()
@Component({
  selector: 'page-admin-cancel-booking',
  templateUrl: 'admin-cancel-booking.html',
})
export class AdminCancelBookingPage implements OnInit {

  messages: Array<Message> = [];
  messageReason: string;
  message:Message;
  tag: string;
  booking: Booking;
  bookingDetails:BookingDetails = new BookingDetails();
  change:any;
  other:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private messageService: MessagesService,private bookingService:BookingsService,private viewCtrl:ViewController) {
    if (navParams.get('selectedBooking') != null || navParams.get('selectedBooking') != undefined) {
      this.booking = navParams.get('selectedBooking');
    }
    if (navParams.get('tag') != null || navParams.get('tag') != undefined) {
      this.tag = navParams.get('tag');
    }
    console.log("Tag", this.tag);
  }

  ngOnInit() {
    this.initMessages();
  }

  initMessages() {
    this.messageService.query().subscribe(data => {
      data.forEach(message => {
        if (message.tag == this.tag) {
          this.messages.push(message);
        }
      });
    }, error => console.log(error));
  }

  confirmCancellation(message:Message) {
    this.booking.cancelled=true;
    this.bookingDetails.booking= this.booking;
    if(this.other != null || this.other != undefined)
    {
      this.message=new Message();
      this.message.tag=this.tag;
      this.message.reason= this.other;
      this.bookingDetails.message = this.message;
    }
    else{
      this.bookingDetails.message = message;
    }

    this.bookingService.updateBooking(this.bookingDetails).subscribe(data => {
      console.log("result ", data);
      this.viewCtrl.dismiss({booking:this.bookingDetails.booking});
    }, error => console.log(error));
    
  }

changes(event:any)
{
  this.change = event;
}

dismiss() {
  this.viewCtrl.dismiss();
}
}
