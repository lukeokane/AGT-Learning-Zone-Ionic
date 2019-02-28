import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { CourseService } from '../../../providers/course/course.service';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';
import { BookingsService } from '../../../services/Booking.provider';
import { Booking } from '../../../class/Booking';
import { DatePipe } from '@angular/common';


/**
 * Generated class for the AdminStatisticsDeliveredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-statistics-delivered',
  templateUrl: 'admin-statistics-delivered.html',
})
export class AdminStatisticsDeliveredPage {

  toDate: any;
  fromDate: any;
  selectedYear: string;
  selectedCourse: string;
  courses: Course[];
  bookings: Array<Booking>;
  months: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  monthsName: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  inc: number;
  pos: number = 0;
  label: any ='Tutorials Delivered';
  lineChartDataFinal: Array<any> = [];
  barChartLegend = true;
  barChartType = 'bar';
  
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  public lineChartData2: Array<any> = [0,0,0,0,0,0,0,0,0,0,0,0];

  public lineChartData: Array<any> = [
    { data: this.lineChartData2, label: 'Tutorials Delivered' }

  ];

  
  public lineChartLabels2: Array<any> = [];

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private courseService: CourseService,
    private bookingsService: BookingsService,
    private datePipe: DatePipe
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

    if (this.selectedCourse == "all" && this.selectedYear == "all") {
      this.bookingsService.findAllBookingsDistributionList(this.fromDate, this.toDate).subscribe(data => {
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
          if (this.checkDuplicates(this.monthsName[this.inc]) == false) {
            console.log(this.monthsName[this.inc]);
            this.lineChartLabels2.push(this.monthsName[this.inc]); // pushing to a postion in the array if there is no duplicate entry
          }
          this.lineChartData2[this.inc]++;
        } 
      }
    }
    console.log(this.lineChartData2);
    console.log(this.lineChartLabels2);
    this.filterLineChartData();
    this.combineArrays();
  }


  getMonth(dateTime) {
    const date = this.datePipe.transform(dateTime, 'MM', 'UTC');
    return date;
  }

  combineArrays(){
        this.lineChartDataFinal.push(this.lineChartData2);
        this.lineChartDataFinal.push(this.label);
        console.log(this.lineChartDataFinal);
  }

  checkDuplicates(month: any): boolean {
    for (let mon of this.lineChartLabels2) {
      if (mon == month) {
        return true;
      }
    }
    return false;
  }

  filterLineChartData(){
    for (this.pos = 0; this.pos < this.lineChartData2.length; this.pos++){
       if(this.lineChartData2[this.pos]==0) {
        this.lineChartData2.splice(this.pos, 1);
        this.pos = 0
       }
    }
     console.log(this.lineChartData2);
  }

}

