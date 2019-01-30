import { Principal } from './../../providers/auth/principal.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, App } from 'ionic-angular';
import { MainPage } from '../pages';
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
        let isTrue: boolean = false;
        if (elem == "ROLE_ADMIN")
          isTrue = true
        return isTrue;
      })) {
        this.app.getRootNavs()[0].setRoot(MainPage);
      } else if (this.principal.userIdentity.authorities.some(function (elem) {
        let isTrue: boolean = false;
        if (elem == "ROLE_USER")
          isTrue = true
        return isTrue;
      })) {
        this.app.getRootNavs()[0].setRoot("UserHomePage");
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
