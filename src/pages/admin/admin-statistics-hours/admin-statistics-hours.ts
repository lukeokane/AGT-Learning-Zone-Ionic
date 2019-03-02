import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { CourseService } from '../../../providers/course/course.service';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';
import { BookingsService } from '../../../services/Booking.provider';
import { Booking } from '../../../class/Booking';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../services/excel.service';

/**
 * Generated class for the AdminStatisticsHoursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-statistics-hours',
  templateUrl: 'admin-statistics-hours.html',
})
export class AdminStatisticsHoursPage {

  toDate: any;
  fromDate: any;
  selectedYear: string;
  selectedCourse: string;
  courses: Course[];
  bookings: Array<Booking>;
  months: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  monthsName: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  inc: number;
  divider: number = 60;
  timeParse: any;
  time1: any;
  time2: any;
  pos: number = 0;
  pos2: number = 0;
  tutorialLengthHours: any;
  diffHours: any;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartDataTutor: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  barChartDataStudent: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public barChartLabels2: Array<any> = [];


  public barChartData = [
    { data: this.barChartDataTutor, label: 'Tutor Hours' },
    { data: this.barChartDataStudent, label: 'Student Hours' }
  ];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private courseService: CourseService,
    private bookingsService: BookingsService,
    private datePipe: DatePipe,
    private excelService: ExcelService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStatisticsDistributionPage');
    this.loadAll();
  }

  loadAll() {
    this.courseService.findAllCoursesList().subscribe(data => {
      this.courses = data.body;
      console.log(this.courses);
      console.log(this.selectedCourse);
    }, error => {
      console.log(error);
    });
  }

  generateChart() {

    // this.barChartDataTutor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // this.barChartDataStudent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (this.selectedCourse == "all" && this.selectedYear == "all") {
      this.bookingsService.findAllBookingsList(this.fromDate, this.toDate).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookingsByDate();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse == "all" && this.selectedYear != "all") {
      console.log("got here all courses and a selected year");
      this.bookingsService.findAllBookingsAllCoursesSelectedYear(this.fromDate, this.toDate, this.selectedYear).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookingsByDate();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse != "all" && this.selectedYear != "all") {
      console.log("got here seleceted course and selected year");
      this.bookingsService.findAllBookingsSelectedCourseAndSelectedYear(this.fromDate, this.toDate, this.selectedCourse, this.selectedYear).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookingsByDate();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse != "all" && this.selectedYear == "all") {
      console.log("got here seleceted course and all years");
      this.bookingsService.findAllBookingsSelectedCourseAndAllYears(this.fromDate, this.toDate, this.selectedCourse).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookingsByDate();
      }, error => {
        console.log(error);
      });
    }
  }

  filterBookingsByDate() {
    for (let booking of this.bookings) {
      for (this.inc = 0; this.inc < this.months.length; this.inc++) {
        if (this.getMonth(booking.startTime) == this.months[this.inc]) {
          this.tutorialLengthHours = this.tutorialLength(booking.startTime, booking.endTime);
          if (this.checkDuplicates(this.monthsName[this.inc]) == false) {
            this.barChartLabels2.push(this.monthsName[this.inc]);
          }
          this.barChartDataTutor[this.inc] += this.tutorialLengthHours;
          this.barChartDataStudent[this.inc] += this.tutorialLengthHours * booking.bookingUserDetailsDTO.length + 1;
        }
      }
    }
    console.log(this.barChartDataTutor);
    console.log(this.barChartDataStudent);
    console.log(this.barChartLabels2);
    this.filterTutorChartData();
    this.filterStudentChartData();
  }

  getMonth(dateTime) {
    const date = this.datePipe.transform(dateTime, 'MM', 'UTC');
    return date;
  }

  tutorialLength(dateTimeStart, dateTimeEnd) {

    this.time1 = new Date(dateTimeEnd);
    this.time2 = new Date(dateTimeStart);
    this.timeParse = (this.time1 - this.time2);
    this.diffHours = (this.timeParse % 86400000) / 3600000;
    console.log(this.diffHours);

    return this.diffHours;
  }

  checkDuplicates(month: any): boolean {
    for (let mon of this.barChartLabels2) {
      if (mon == month) {
        return true;
      }
    }
    return false;
  }

  filterTutorChartData() {
    for (this.pos = 0; this.pos < this.barChartDataTutor.length; this.pos++) {
      if (this.barChartDataTutor[this.pos] == 0) {
        this.barChartDataTutor.splice(this.pos, 1);
        this.pos = 0
      }
    }
  }

  filterStudentChartData() {
    for (this.pos2 = 0; this.pos2 < this.barChartDataStudent.length; this.pos2++) {
      if (this.barChartDataStudent[this.pos2] == 0) {
        this.barChartDataStudent.splice(this.pos2, 1);
        this.pos2 = 0
      }
    }
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.bookings, 'sample');
  }
}
