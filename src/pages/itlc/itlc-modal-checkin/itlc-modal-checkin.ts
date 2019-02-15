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
          width: 550,
          height: 290,
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
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 3 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 1 });
        }
      }
    });


    Quagga.onDetected(function (result) {
      console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
      document.querySelector(".found").innerHTML = result.codeResult.code;
      Quagga.stop();
    });
  }

  ionViewWillLeave() {
    Quagga.stop();
  }

}