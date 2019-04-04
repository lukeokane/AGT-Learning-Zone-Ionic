import { CourseService } from './../../services/Course.provider';
import { CourseYear } from './../../class/CourseYear';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

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
  account: { id: number, login: string, email: string, firstName: string, lastName: string, password: string, langKey: string, courseId: number, year: number, authorities: any[] } = {
    id: 0,
    login: '',
    email: '',
    firstName: '',
    lastName: '',
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

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private courseService: CourseService,
    private courseYearService: CourseYearService,
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
    if (this.roleType == "ROLE_TUTOR") {
      this.account.authorities = ['ROLE_TUTOR'];
      this.account.year = null;
      this.signupSuccessString = "An ITLC staff member will handle your registering request";
    }
    else if (this.roleType == "ROLE_USER") {
      this.account.authorities = ['ROLE_USER'];
      this.account.year = this.selectedYear.id;
      this.account.courseId = this.selectedCourse.id;
    }
  
    this.account.login = this.account.email;

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

  roleTypes(event: any) {
    this.roleType = event;
  }

  goToLogin()
  {
    this.navCtrl.push(loginPage);
  }
}
