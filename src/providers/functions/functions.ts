import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/UserInfo.provider';
import { UserService } from '../../services/User.provider';
import { User } from '../user/user';
import { UserInfo } from '../../class/UserInfo';

/*
  Generated class for the FunctionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FunctionsProvider{
  filterTutors: Array<User> = [];
  userInfos: Array<UserInfo>=[];

  constructor(public http: HttpClient,
    private userService: UserService,
    private userInfoService: UserInfoService) {
    console.log('Hello FunctionsProvider Provider');
    this.initUsers();


  }

  // getTutor(){
  //   return this.filterTutors;
  // }
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

  initUsers() {
    this.userService.query()
      .subscribe(
        (response) => {
          this.filterTutors = [];
          console.log("response");

          console.log(response);

          response.forEach(user => {
            if (user.activated == true) {
              user.authorities.forEach(authority => {
                if (authority == "ROLE_TUTOR") {
                  this.filterTutors.push(user);
                  this.initUserInfo(user.id);
                }
              });
            }
          });
        },
        (error) => {
          console.error(error);
          // let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          // toast.present();
        });
  }
}
