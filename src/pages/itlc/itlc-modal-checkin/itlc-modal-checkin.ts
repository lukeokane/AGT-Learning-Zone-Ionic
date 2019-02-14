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
          height: 280,
          facing: "environment"
        }
      },
      decoder: {
        readers: [
          "code_39_reader",
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
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });


    Quagga.onDetected(function (result) {
      console.log("Barcode detected : [" + result.codeResult.code + "]", result);
      Quagga.stop();

    });
  }
}
