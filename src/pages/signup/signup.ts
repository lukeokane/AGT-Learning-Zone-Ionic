import { GdprNoticePage } from './../gdpr-notice/gdpr-notice';
import { CourseService } from './../../services/Course.provider';
import { CourseYear } from './../../class/CourseYear';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage, loginPage } from '../pages';
import { CourseYearService } from '../../services/CourseYear.provider';
import { Course } from '../../class/Course';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
  // The account fields for the signup form
  account: { id: number, login: string, email: string, firstName: string, lastName: string, password: string, langKey: string, courseId: number, courseYearId: number, authorities: any[] } = {
    id: 0,
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    langKey: 'en',
    courseId: 0,
    courseYearId: 0,
    authorities: [''],
  };

  // Our translated text strings
  private signupErrorString: string;
  private signupSuccessString: string;
  private existingUserError: string;
  private invalidPasswordError: string;

  courseYears: Array<CourseYear>;
  FilteredYears: Array<CourseYear>;
  courses: Array<Course>;
  arr: Array<Course>;
  page: number;
  data: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  selectedYear: CourseYear;
  selectedCourse: Course;
  roleType: any;
  check: boolean = false;
  checkPassword: any;
  validEmail: boolean;
  validPassword: boolean;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private courseService: CourseService,
    private courseYearService: CourseYearService,
    private modalCtrl: ModalController
  ) {

    this.translateService.get(['SIGNUP_ERROR', 'SIGNUP_SUCCESS',
      'EXISTING_USER_ERROR', 'INVALID_PASSWORD_ERROR']).subscribe((values) => {
        this.signupErrorString = values.SIGNUP_ERROR;
        this.signupSuccessString = values.SIGNUP_SUCCESS;
        this.existingUserError = values.EXISTING_USER_ERROR;
        this.invalidPasswordError = values.INVALID_PASSWORD_ERROR;
      })
  }


  ngOnInit() {
    this.initCourses();
    this.initCourseYear(event);
  }


  initCourses(refresher?) {
    this.courseService.query().subscribe(
      (response) => {
        this.courses = response;
        if (typeof (refresher) !== 'undefined') {
          refresher.complete();
        }
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }


  initCourseYear(event: any, refresher?) {
    this.selectedYear=null;
    this.FilteredYears = [];
    if (event != null && event != undefined) {
      this.arr = [event];
    }

    this.courseYearService.query().subscribe(
      (response) => {
        this.courseYears = response;
        for (let i = 0; i < this.courseYears.length; i++) {
          if (this.arr != null && this.arr != undefined) {
            if (this.courseYears[i].courseId == this.arr[0].id) {
              this.FilteredYears.push(this.courseYears[i]);
            }
          }
        }
        if (typeof (refresher) !== 'undefined') {
          refresher.complete();
        }
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }

  doSignup() {

    this.account.authorities = ['ROLE_USER'];
    this.account.courseYearId = this.selectedYear.id;
    this.account.courseId = this.selectedCourse.id;
    this.account.login = this.account.email.substr(0, this.account.email.lastIndexOf("@"));


    this.user.signup(this.account).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: this.signupSuccessString,
        duration: 6000,
        position: 'top',
        cssClass: 'toastcolor'
      });
      toast.present();
      this.navCtrl.push(MainPage);
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
        position: 'middle',
        cssClass: 'toastcolor'
      });
      toast.present();
    });
  }

  getScreenSize() {
    return window.innerWidth;
  }

  goToLogin() {
    this.navCtrl.push(loginPage);
  }

  displayGDPR() {
    window.open("http://localhost:8100/#/gdpr-notice", '_blank');
    return false;
  }

  validateEmailAddress(email: any) {
    let regEx = /\S+@\S+\.\S+/;
    if (regEx.test(email.target.value)) {
      this.validEmail = true;
    }
    else {
      this.validEmail = false;
    }
    return this.validEmail;
  }

  validatePassword(password: any) {
    let regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8}/;
    if (regEx.test(password.target.value)) {
      this.validPassword = true;
    }
    else {
      this.validPassword = false;
    }
    return this.validPassword;
  }
  validateInput(){
    return !(this.validPassword&&this.validEmail)|| this.selectedCourse==null||this.selectedCourse==undefined || this.selectedYear==null||this.selectedYear==undefined||this.account.firstName==null||this.account.firstName==undefined||this.account.firstName==""||this.account.lastName==null||this.account.lastName==undefined ||this.account.lastName=="";
  }
}
