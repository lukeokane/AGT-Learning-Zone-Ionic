import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { User } from '../../../../providers/providers';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-admin-add-tutors',
  templateUrl: 'admin-add-tutors.html',
})
export class AdminAddTutorsPage {

  checkPassword:any;
  invalid :boolean;

  account: { id: number, login: string, email: string, firstName: string, lastName: string,userName:string, password: string, langKey: string, courseId: number, year: number, authorities: any[] } = {
    id: 0,
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    userName:'',
    password: '',
    langKey: 'en',
    courseId: 0,
    year: 0,
    authorities: [''],
  };

    // Our translated text strings
    private signupErrorString: string;
    private signupSuccessString: string;
    private existingUserError: string;
    private invalidPasswordError: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,public toastCtrl: ToastController,    public translateService: TranslateService,private viewCtrl:ViewController) {
    this.translateService.get(['SIGNUP_ERROR', 'SIGNUP_SUCCESS',
    'EXISTING_USER_ERROR', 'INVALID_PASSWORD_ERROR']).subscribe((values) => {
      this.signupErrorString = values.SIGNUP_ERROR;
      this.signupSuccessString = values.SIGNUP_SUCCESS;
      this.existingUserError = values.EXISTING_USER_ERROR;
      this.invalidPasswordError = values.INVALID_PASSWORD_ERROR;
    })
  }

  doSignup() {    
    this.account.authorities = ['ROLE_TUTOR'];
    this.account.login = this.account.email;
    this.account.firstName = this.account.firstName;

    this.user.signup(this.account).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Activation link sent to tutor email',
        duration: 6000,
        position: 'top',
        cssClass: 'toastcolor'
      });
      toast.present();
      this.viewCtrl.dismiss();
    }, (response) => {
      // Unable to sign up
      const error = JSON.parse(response.error);
      let displayError = this.signupErrorString;
      if (response.status === 400 && error.type.includes('already-used')) {
        displayError = this.existingUserError;
      } else if (response.status === 400 && error.message === 'error.validation'
        && error.fieldErrors[0].field === 'password' && error.fieldErrors[0].message === 'Size') {
        displayError = this.invalidPasswordError;
      }
      let toast = this.toastCtrl.create({
        message: displayError,
        duration: 6000,
        position: 'bottom',
        cssClass: 'toastcolor'
      });
      toast.present();
    });
  }

}
