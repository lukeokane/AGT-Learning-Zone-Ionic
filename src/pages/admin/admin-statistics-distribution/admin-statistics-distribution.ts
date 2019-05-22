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
   
    legend: { position: 'right' },
    pieceLabel: {
      render: 'label',
      position: 'outside',
      overlap: true,
      outsidePadding: 4,
      fontStyle: 'bold',
    },
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
    this.loadAllSubjects();
    this.today();
    this.startDate();

  }

  loadAllCourses() {
    this.courseService.findAllCoursesList().subscribe(data => {
      this.courses = data.body;
      console.log(this.courses);
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
  
    /**
  *   Method to get booking data from the backend depending on the combination of requests from the tutorials distribution
  */
  generateChart() {

    if (this.selectedCourse == "all" && this.selectedYear == "all") {

      this.bookingsService.findAllBookingsList(this.fromDate, this.toDate).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookings();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse == "all" && this.selectedYear != "all") {

      this.bookingsService.findAllBookingsAllCoursesSelectedYear(this.fromDate, this.toDate, this.selectedYear).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookings();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse != "all" && this.selectedYear != "all") {

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

  }
  
  /**
  *   Method to filter chart data into lists for the angular charts
  */
  filterBookings() {
    for (let booking of this.bookings) {
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
  
  /**
  *   Method to check for duplicates in the months list
  *    @param month
  *    @returns boolean whether month is alleady in the distribution labels list
  */
  checkDuplicates(title: string): boolean {
    for (let label of this.labels) {
      if (label == title) {
        return true;
      }
    }
    return false;
  }
  
   /**
  *   Method to export booking data in xls format
  */
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.bookings, 'Bookings');
  }

   /**
  *   Method to export chart data in xls file format
  */
  exportChartDataAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.filteredExcelData, 'ChartData');
  }

  /**
  *   refreshes page flushing out array data
  */
  refreshPage() {
    this.navCtrl.push("AdminStatisticsDistributionPage");
  }

  /**
  *   Method to fill chart data list before generating in xls
  */
  filterExcelData() {
    this.filteredExcelData.push(this.selectedCourse);
    this.filteredExcelData.push("Year " + this.selectedYear);
    this.filteredExcelData.push("From " + this.fromDate);
    this.filteredExcelData.push("To   " + this.toDate);
    this.filteredExcelData.push(this.labels);
    this.filteredExcelData.push(this.data);

  }

  /**
  *   Method to get the course id from the selected course name
  *    @param selectedCourse
  *    @returns course id
  */
  getCourseId(selectedCourse): number {
    for (let course of this.courses) {
      if (course.title == selectedCourse) {
        this.id = course.id;
      }
    }
    return this.id;
  }

  /**
  *   Sets the start date to the first of jan of the current year
  */
  today() {

    const dateFormat = 'yyyy-MM-dd';
    const today: Date = new Date();
    today.setDate(today.getDate() + 1);
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.toDate = this.datePipe.transform(date, dateFormat);
  }
  
   /**
  *   Sets the start date to the first of jan of the current year
  */
  startDate() {
    const dateFormat = 'yyyy-MM-dd';
    let fromDate: Date = new Date();
    fromDate = new Date(fromDate.getFullYear(),0);
    this.fromDate = this.datePipe.transform(fromDate, dateFormat);
   }

}
