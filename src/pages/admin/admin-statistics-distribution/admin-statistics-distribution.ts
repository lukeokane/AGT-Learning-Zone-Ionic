import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';
import { BookingsService } from '../../../services/Booking.provider';
import { Booking } from '../../../class/Booking';
import { SubjectsService } from '../../../services/Subject.provider';
import { Subject } from '../../../class/Subject';
import { ExcelService } from '../../../services/excel.service';
import { DatePipe } from '@angular/common';


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

  ACM: string = "ACM Booking";
  toDate: any;
  fromDate: any;
  selectedYear: string = "all";
  selectedCourse: string = "all";
  courses: Course[];
  subjects: Subject[];
  bookings: Array<Booking>;
  labels: string[] = [];
  data: number[] = [];
  pos: number = 0;
  posData: number = 0;
  inc: number;
  chartGenerated: boolean = false;
  courseId: number;
  id: number;
  filteredExcelData: Array<any> = [];

  public doughnutChartType: string = 'doughnut';
  public barChartOptions: any = {
    // title: {
    //   text: 'Tutorial Distribution By Module',
    //   display: true,
    //   position: 'bottom',
    //   fontSize: 18,
    // },
    legend: { position: 'right' },
    pieceLabel: {
      render: 'label',
      position: 'outside',
      overlap: true,
      outsidePadding: 4,
      fontStyle: 'bold',
    },
  }

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
    private subjectsService: SubjectsService,
    private excelService: ExcelService,
    private datePipe: DatePipe, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStatisticsDistributionPage');
    this.bookings = new Array<Booking>();
    this.loadAllCourses();
    //this.loadAllBookings();
    this.loadAllSubjects();
    this.today();
    this.previousMonth();
  }

  loadAllCourses() {
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

    if (this.selectedCourse == "all" && this.selectedYear == "all") {
      console.log("got here selected course all selected year all");
      this.bookingsService.findAllBookingsList(this.fromDate, this.toDate).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookings();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse == "all" && this.selectedYear != "all") {
      console.log("got here all courses and a selected year");
      this.bookingsService.findAllBookingsAllCoursesSelectedYear(this.fromDate, this.toDate, this.selectedYear).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookings();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse != "all" && this.selectedYear != "all") {
      console.log("got here seleceted course and selected year");
      this.courseId = this.getCourseId(this.selectedCourse);
      console.log(this.courseId);
      this.bookingsService.findAllBookingsSelectedCourseAndSelectedYear(this.fromDate, this.toDate, this.courseId, this.selectedYear).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookings();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse != "all" && this.selectedYear == "all") {
      console.log("got here seleceted course and all years");
      this.courseId = this.getCourseId(this.selectedCourse);
      console.log(this.courseId);
      this.bookingsService.findAllBookingsSelectedCourseAndAllYears(this.fromDate, this.toDate, this.courseId).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookings();
      }, error => {
        console.log(error);
      });
    }
    // console.log(this.toDate);
    //console.log(this.fromDate);
    console.log(this.selectedYear);
    console.log(this.selectedCourse);
    //console.log(this.bookings);
  }

  filterBookings() {
    for (let booking of this.bookings) {
      if (booking.title != this.ACM) {
        for (let subject of this.subjects) {
          if (booking.subjectId == subject.id) {
            if (this.checkDuplicates(subject.title) == false) {
              this.labels.push(subject.title);
              this.data[this.pos] = 1;
              this.pos++;

            }
            else {

              this.posData = this.findPosSubject(subject.title);
              this.data[this.posData]++;
            }
          }
        }
      }
    }
    this.chartGenerated = true;
    this.filterExcelData();
  }

  findPosSubject(title: string): number {

    for (this.inc = 0; this.inc < this.labels.length; this.inc++) {
      if (this.labels[this.inc] == title) {
        return this.inc;
      }
    }
  }

  checkDuplicates(title: string): boolean {
    for (let label of this.labels) {
      if (label == title) {
        return true;
      }
    }
    return false;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.bookings, 'Bookings');
    this.excelService.exportAsExcelFile(this.filteredExcelData, 'ChartData');
  }

  refreshPage() {
    this.navCtrl.push("AdminStatisticsDistributionPage");
  }

  filterExcelData() {
    this.filteredExcelData.push(this.selectedCourse);
    this.filteredExcelData.push(this.selectedYear);
    this.filteredExcelData.push(this.fromDate);
    this.filteredExcelData.push(this.toDate);
    this.filteredExcelData.push(this.labels);
    this.filteredExcelData.push(this.data);
    console.log(this.filteredExcelData);
  }

  getCourseId(selectedCourse): number {
    for (let course of this.courses) {
      if (course.title == selectedCourse) {
        this.id = course.id
        console.log(this.id);
      }
    }
    return this.id;
  }

  today() {
    const dateFormat = 'yyyy-MM-dd';
    // Today + 1 day - needed if the current day must be included
    const today: Date = new Date();
    today.setDate(today.getDate() + 1);
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.toDate = this.datePipe.transform(date, dateFormat);
  }

  previousMonth() {
    const dateFormat = 'yyyy-MM-dd';
    let fromDate: Date = new Date();
    if (fromDate.getMonth() === 0) {
        fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
    } else {
        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 4, fromDate.getDate());
    }
    this.fromDate = this.datePipe.transform(fromDate, dateFormat);
}

}
