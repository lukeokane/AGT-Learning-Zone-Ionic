import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserRequestModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-request-modal',
  templateUrl: 'user-request-modal.html',
})
export class UserRequestModalPage {
  dateSelected: Date;
  timeSelected: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dateSelected = this.navParams.get("dateSelected");
    console.log(this.dateSelected.toString());
    this.timeSelected = this.navParams.get("timeSelected");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlotModalPage');
  }
  convertToString(){
    return "Date: "+ this.dateSelected.getDate() +"/"+(this.dateSelected.getMonth()+1)+ " Time:"+ this.timeSelected+":00"; 
  }

}
