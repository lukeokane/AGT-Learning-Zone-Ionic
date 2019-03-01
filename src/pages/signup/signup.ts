import { CourseService } from './../../services/Course.provider';
import { CourseYear } from './../../class/CourseYear';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { CourseYearService } from '../../services/CourseYear.provider';
import { Course } from '../../class/Course';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
  // The account fields for the signup form
  account: { login: string, email: string, firstName: string, lastName: string, password: string, langKey: string, course: string, year: number } = {
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    langKey: 'en',
    course: '',
    year: 0
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

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private courseService: CourseService,
    private courseYearService: CourseYearService
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
    this.account.year = this.selectedYear.id;
    console.log(this.account);
    console.log(this.selectedYear);

    // set login to same as email
    this.account.login = this.account.email;
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: this.signupSuccessString,
        duration: 3000,
        position: 'top'
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
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    });
  }

  getScreenSize() {
    return window.innerWidth;
  }

}
