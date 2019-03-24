import { MessagesService } from './../../../../services/Message.provider';
import { Message } from './../../../../class/Message';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-cancel-booking',
  templateUrl: 'admin-cancel-booking.html',
})
export class AdminCancelBookingPage implements OnInit{

  messages : Array<Message>=[];
  message:any;
  tag:string;
  other:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private messageService:MessagesService) {
  }

  ngOnInit()
  {
    this.initMessages();
  }

  initMessages()
  {
    this.tag = "cancelBooking";
    this.messageService.query().subscribe(data => {

      data.forEach(message => {
        if(message.tag == this.tag){
          this.messages.push(message);
          console.log("aaaaaaa ", this.messages);
        }
      });
    }, error => console.log(error));
  }
  

}
