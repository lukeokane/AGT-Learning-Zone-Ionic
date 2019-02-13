import { userHomePage, itlcHomePage, homePage, tutorHomePage } from './../pages';
import { Principal } from './../../providers/auth/principal.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, App } from 'ionic-angular';
import { LoginService } from '../../providers/login/login.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  account: { username: string, password: string, rememberMe: boolean } = {
    username: '',
    password: '',
    rememberMe: false,
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public loginService: LoginService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private principal: Principal,
    private app: App
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.loginService.login(this.account).then(() => {

      if (this.principal.userIdentity.authorities.some(function (elem) {
        return elem == "ROLE_ADMIN";
      })) {
        this.app.getRootNavs()[0].setRoot(homePage);
      }
      else if (this.principal.userIdentity.authorities.some(function (elem) {
        return elem == "ROLE_USER";
      })) {
        this.app.getRootNavs()[0].setRoot(userHomePage);
      }
      else if (this.principal.userIdentity.authorities.some(function (elem) {
        return elem == "ROLE_ITLC";
      })) {
        this.app.getRootNavs()[0].setRoot(itlcHomePage);
      }
      else if (this.principal.userIdentity.authorities.some(function (elem) {
        return elem == "ROLE_TUTOR";
      })) {
        this.app.getRootNavs()[0].setRoot(tutorHomePage);
      }
    }).catch(() => {
      // Unable to log in
      this.account.password = '';
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 4000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Got it!',
        cssClass: "toastCSS",
      });
      toast.present();
    });
  }

  getScreenSize() {
    return window.innerWidth;
  }

}
