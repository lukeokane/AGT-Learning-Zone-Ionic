import { BookingUserDetails } from './../../../class/BookingUserDetails';
import { BookingUserDetailService } from './../../../services/BookingUserDetails.provider';
import { Booking } from './../../../class/Booking';
import { UserService } from './../../../services/User.provider';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import Quagga from 'quagga';
import { itlcHomePage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-itlc-modal-checkin',
  templateUrl: 'itlc-modal-checkin.html',
})
export class ItlcModalCheckinPage implements OnInit {
  login: any;
  user:any;
  selectedBooking:Booking = new Booking();
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private userService: UserService,
    private bookingUserDetailService:BookingUserDetailService,
    private viewCtrl:ViewController
  ) {
    if (navParams.get('selectedBooking') != null || navParams.get('selectedBooking') != undefined) {
      this.selectedBooking = navParams.get('selectedBooking');
    }
   }

  ngOnInit() {
    let video: any = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.srcObject = stream;
        video.play();
      });

    }

    // Elements for taking the snapshot
    let canvas: any = document.getElementById('canvas');
    let context: any = canvas.getContext('2d');
    video = document.getElementById('video');

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner'),
        constraints: {
          width: 570,
          height: 260,
          facingMode: "user",
        },
      },
      decoder: {
        readers: [
          "code_39_reader",
          "code_39_vin_reader",
        ],
      },

    }, function (err) {
      if (err) {
        console.log(err);
        return
      }

      Quagga.start();
    });

    Quagga.onProcessed(function (result) {

      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
      if (result) {

        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 3 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 1 });
        }
      }
    });


    Quagga.onDetected((result) => {
      console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
      // document.querySelector(".found").innerHTML = result.codeResult.code;
      this.login =result.codeResult.code;
      context.drawImage(video, 20, 16.5,575, 320);
      Quagga.stop();
      this.checkInUserDetails(this.login);
    },
    );
  }

  checkInUserDetails(barcode :any)
  { 
    this.userService.getUserByLogin(barcode).subscribe(user => {
      this.user= user;
      console.log("this user",this.user);
    }, (error) => {
      console.error(error);
    });
  }

  checkIn()
  {
    let bookingUserDetails
    bookingUserDetails= new BookingUserDetails();
    if(this.selectedBooking != null || this.selectedBooking != undefined)
    {
    this.bookingUserDetailService.updateBookingUserDetailsForCheckIn(this.selectedBooking.id,this.login,bookingUserDetails).subscribe(data => {
      console.log("data",data);
      this.navCtrl.push(itlcHomePage);
    }, (error) => {
      console.error(error);
    });
  }
  }

  cancel()
  {
    this.viewCtrl.dismiss();
  }
}



