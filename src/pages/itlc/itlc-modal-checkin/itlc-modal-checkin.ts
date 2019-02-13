import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Quagga from 'quagga'; 

@IonicPage()
@Component({
  selector: 'page-itlc-modal-checkin',
  templateUrl: 'itlc-modal-checkin.html',
})
export class ItlcModalCheckinPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner'),
        constraints: {
          width: 640,
          height: 280,
          facing: "environment"
      }
      },
      decoder: {
        readers: [
          "code_128_reader"
        ],
      },

    }, function (err) {
      if (err) {
        console.log(err);
        return
      }

      Quagga.start();

    });
  }
}