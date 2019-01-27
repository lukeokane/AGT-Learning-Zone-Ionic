import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CourseService } from './../../services/Course.provider';
import { SemesterGroupService } from './../../services/SemesterGroup.provider';
import { CourseYear } from './../../class/CourseYear';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { SemesterGroup } from '../../class/SemesterGroup';
import { CourseYearService } from '../../services/CourseYear.provider';
import { Course } from '../../class/Course';
import { SemesterService } from '../../services/Semester.provider';
import { Semester } from '../../class/Semester';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
  // The account fields for the signup form
  account: { login: string, email: string, firstName: string, lastName: string, password: string, langKey: string, course: string, year: number, semesterGroup: string } = {
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    langKey: 'en',
    course: '',
    year: 0,
    semesterGroup: ''
  };

  // Our translated text strings
  private signupErrorString: string;
  private signupSuccessString: string;
  private existingUserError: string;
  private invalidPasswordError: string;
  semester: Array<Semester>;
  semesterGroup: Array<SemesterGroup>;
  courseYears: Array<CourseYear>;
  FilteredYears: Array<CourseYear>;
  courses: Array<Course>;
  arr: Array<Course>;
  newArr: any;
  FilteredSemesters: Array<Semester> = [];
  FilteredSemesterGroup: Array<SemesterGroup>;
  page: number;
  data: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private courseService: CourseService,
    private courseYearService: CourseYearService,
    private semesterService: SemesterService,
    private semesterGroupService: SemesterGroupService,
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
    this.initSemester(event);
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

  initSemester(event: any, refresher?) {
    this.itemsPerPage = 30;
    this.FilteredSemesters = [];
    if (event != null && event != undefined) {
      this.arr = [event];
    }

    this.semesterService.query1({
      page: this.page - 1,
      size: this.itemsPerPage
    }).subscribe(
      (res: HttpResponse<Semester[]>) => {
        this.onSuccess(res.body, res.headers, this.arr)
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }


  private onSuccess(data, headers, arr) {
    this.semester = [];
    this.arr = arr;
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.semester = data;
    for (let i = 0; i < this.semester.length; i++) {
      if (this.arr != null && this.arr != undefined) {
        if (this.semester[i].courseYearId == this.arr[0].id) {
          Array.of(this.semester[i]);
          this.FilteredSemesters.push(this.semester[i]);
        }
      }
    }
    if (this.FilteredSemesters != null && this.FilteredSemesters != undefined && this.FilteredSemesters.length > 0) {
      this.initSemesterGroups(this.FilteredSemesters);
    }

  }

  initSemesterGroups(event, refresher?) {
    this.itemsPerPage = 64;

    this.semesterGroupService.query1({
      page: this.page - 1,
      size: this.itemsPerPage
    }).subscribe(
      (res: HttpResponse<SemesterGroup[]>) => {
        this.onSuccess1(res.body, res.headers, event)
      },
      (error) => {
        console.error(error);
        let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
      });
  }

  private onSuccess1(data, headers, event) {
    this.totalItems = headers.get('X-Total-Count');
    this.FilteredSemesterGroup = [];
    this.semesterGroup = data;
    for (let i = 0; i < this.semesterGroup.length; i++) {
      if (event != null && event != undefined) {
        if (this.semesterGroup[i].semesterId == event[0].id) {
          if (this.FilteredSemesterGroup.indexOf(this.semesterGroup[i]) == -1) {
            this.FilteredSemesterGroup.push(this.semesterGroup[i]);
          }
        }
      }
    }
  }

  doSignup() {
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
