import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { CourseService } from '../../../providers/course/course.service';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';
import { BookingsService } from '../../../services/Booking.provider';
import { Booking } from '../../../class/Booking';
import { SubjectsService } from '../../../services/Subject.provider';
import { Subject } from '../../../class/Subject';

/**
 * Generated class for the AdminStatisticsDistributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-statistics-distribution',
  templateUrl: 'admin-statistics-distribution.html',
})
export class AdminStatisticsDistributionPage {

  toDate: any;
  fromDate: any;
  selectedYear: any;
  courses: Course[];
  subjects: Subject[];
  selectedCourse: Course;
  itemsPerPage: any;
  page: number;
  totalItems: any;
  queryCount: any;
  bookings: Array<Booking>;

  // Doughnut
  public doughnutChartLabels: string[] = ['Java', 'Javascript', 'C++'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private courseService: CourseService,
    private bookingsService: BookingsService,
    private subjectsService: SubjectsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStatisticsDistributionPage');
    this.bookings = new Array<Booking>();
    //this.bookings


    this.loadAll();
    //this.loadAllBookings();
    this.loadAllSubjects();
  }

  loadAll() {
    this.courseService.findAllCoursesList().subscribe(data => {
      this.courses = data.body;
      console.log(this.courses);
      // console.log(this.selectedCourse);
    }, error => {
      console.log(error);
    });
  }

  loadAllBookings() {
    this.bookingsService.findAllBookingsDistributionList(this.toDate, this.fromDate).subscribe(data => {
      this.bookings = data.body;
      console.log(this.bookings);
    }, error => {
      console.log(error);
    });

  }

  loadAllSubjects() {
    this.subjectsService.findAllSubjectsList().subscribe(data => {
      this.subjects = data.body;
      console.log(this.subjects);
    }, error => {
      console.log(error);
    });

  }

  generateChart() {

    this.bookingsService.findAllBookingsDistributionList(this.fromDate, this.toDate).subscribe(data => {
      this.bookings = data.body;
      console.log(this.bookings);
    }, error => {
      console.log(error);
    });



    console.log(this.toDate);
    console.log(this.fromDate);
    console.log(this.selectedYear);
    console.log(this.selectedCourse);
    console.log(this.bookings);
  }

}
