import { UserInfoService } from './../../../services/UserInfo.provider';
import { adminApproveTutorPage } from './../../pages';
import { User } from './../../../class/User';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './../../../services/User.provider';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';

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
    private toastCtrl: ToastController,
    private modalCtrl:ModalController,
    private userInfoService:UserInfoService,
    private alertCtrl:AlertController
  ) {
  }

  ngOnInit()
  {
    this.initUsers();
  }

  initUsers() {
    this.itemsPerPage =  20;
    this.userService.getAllUsers(
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
    this.tutors = [];
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;

    data.forEach(user => {
      if(user.activated == true)
      {
      user.authorities.forEach(authority => {
        if (authority == "ROLE_TUTOR") {
          this.tutors.push(user);
          this.initUserInfo(user.id);
        }
      });
    }
    });
  }

  initUserInfo(userId: any) {
    this.userInfos = [];

    if (userId != null || userId != undefined) {
      this.userInfoService.find(userId).subscribe((response) => {
        this.userInfos.push(response);
        this.userInfos = this.userInfos.filter(function (a) {
          return !this[a.id] && (this[a.id] = true);
        }, Object.create(null));
      })
    }
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

  ContinueAlert(login: string) {
    let fullName: any;

    let alert = this.alertCtrl.create({
      title: 'Delete Tutor<br> <h6>Are you sure you want to delete this tutor?</h6>',
      subTitle: fullName,
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.navCtrl.pop;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteTutor(login);
          }
        }
     
      ],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }

  deleteTutor(login : string)
  {
    let message = login + " has been deleted";
    let toastMessage = message.split('.').join(" ");

    this.userService.deleteUserByLogin(login).subscribe(data => {
      console.log("data",data);
      this.navCtrl.push(adminApproveTutorPage);
    }, (error) => {
      console.error(error);
    });
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 6000,
      position: 'middle',
      cssClass: 'toastcolor'
    });
    toast.present();
  }

  goToAddTutors()
  {
    let modal = this.modalCtrl.create("AdminAddTutorsPage");
    modal.present();
  }
}
