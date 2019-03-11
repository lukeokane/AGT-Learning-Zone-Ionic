import { User } from './../../../class/User';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './../../../services/User.provider';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { homePage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-admin-approve-tutor',
  templateUrl: 'admin-approve-tutor.html',
})
export class AdminApproveTutorPage implements OnInit{

  tutors: Array<User> = [];
  userInfos: any;
  predicate: any = 'id';
  previousPage: any;
  reverse: any;
  itemsPerPage: any;
  page: number;
  totalItems: any;
  queryCount: any;
  adminId: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {
  }

  ngOnInit()
  {
    this.initUsers();
  }

  initUsers() {
    this.itemsPerPage = 10;
    this.userService.getAllTutorsPendingActivation(
      {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<User[]>) => {
          this.onSuccess(res.body, res.headers)
        },
        (error) => {
          console.error(error);
          let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          toast.present();
        });
  }

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.tutors = data;
    console.log("TUTORS ", this.tutors);
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.initUsers();
    }
  }

  approveTutor(tutor : User)
  {
    tutor.activated=true;
    this.userService.saveUser(tutor);
    this.navCtrl.push(homePage);
  }

  rejectTutor(login : string)
  {
    this.userService.deleteUserByLogin(login).subscribe();
    this.navCtrl.push(homePage);
  }


}
