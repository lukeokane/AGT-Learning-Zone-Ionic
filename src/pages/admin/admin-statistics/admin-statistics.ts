import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-statistics',
  templateUrl: 'admin-statistics.html',
})
export class AdminStatisticsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStatisticsPage');
  }
  toNextStats(){
    this.navCtrl.push("AdminStatisticsDistributionPage");
  }

  toNextStats1(){
    this.navCtrl.push("AdminStatisticsHoursPage");
  }
}
