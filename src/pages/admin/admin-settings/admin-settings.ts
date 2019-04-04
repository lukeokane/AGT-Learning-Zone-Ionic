import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarService } from '../../../services/Calendar.provider';

/**
 * Generated class for the AdminSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-settings',
  templateUrl: 'admin-settings.html',
})
export class AdminSettingsPage {
  names:Array<any>;
  page:String;
  dateStart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public calendarService: CalendarService) {
    this.page='set-date';
    this.names=[{page:'set-date',name:"Set Academic Date"}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSettingsPage');
    this.calendarService.get().subscribe(data => {
      console.log(data);
    }, (erro) => {
      this.dateStart = erro.error.text;
      console.error(erro.error.text);
    });
  }
  itemSelected(name:String){
    this.page=name;

  }
  saveChanges(){
    console.log("dat start "+ this.dateStart);
    this.calendarService.edit(this.dateStart).subscribe(data => {
      console.log(data);
    }, (erro) => {
      this.dateStart = erro.error.text;
      console.error(erro.error.text);
    })
  }
}
