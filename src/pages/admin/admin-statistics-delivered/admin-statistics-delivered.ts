import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';
import { BookingsService } from '../../../services/Booking.provider';
import { Booking } from '../../../class/Booking';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../services/excel.service';


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

  ACM : string = "ACM Booking";
  toDate: any;
  fromDate: any;
  selectedYear: string = "all";
  selectedCourse: string = "all";
  courses: Course[];
  bookings: Array<Booking>;
  months: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  monthsName: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  inc: number;
  pos: number = 0;
  label: any = 'Tutorials Delivered';
  lineChartDataFinal: Array<any> = [];
  barChartLegend = true;
  barChartType = 'bar';
  courseId: number;

  id: number;
  chartGenerated: boolean = false;
  chartLine: boolean = true;
  filteredExcelData: Array<any> = [];

  public lineChartData2: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public lineChartData: Array<any> = [
    { data: this.lineChartData2, label: 'Tutorials Delivered' }

  ];


  public lineChartLabels2: Array<any> = [];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Amount Of Tutorials Delivered',
          fontSize: '16'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month',
          fontSize: '16'
        }
      }]
    }
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
    private datePipe: DatePipe,
    private excelService: ExcelService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStatisticsDistributionPage');
    this.loadAll();
    this.today();
    this.startDate();
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
      this.courseId = this.getCourseId(this.selectedCourse);
      console.log(this.courseId);
      this.bookingsService.findAllBookingsSelectedCourseAndSelectedYear(this.fromDate, this.toDate, this.courseId, this.selectedYear).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookingsByDate();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse != "all" && this.selectedYear == "all") {
      console.log("got here seleceted course and all years");
      this.courseId = this.getCourseId(this.selectedCourse);
      this.bookingsService.findAllBookingsSelectedCourseAndAllYears(this.fromDate, this.toDate, this.courseId).subscribe(data => {
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
      if (booking.title != this.ACM) {
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
    }
    console.log(this.lineChartData2);
    console.log(this.lineChartLabels2);
    this.filterLineChartData();
    this.filterLineChartData();
    this.filterExcelData();
    this.combineArrays();
    this.chartGenerated = true;
  }


  getMonth(dateTime) {
    const date = this.datePipe.transform(dateTime, 'MM', 'UTC');
    return date;
  }

  combineArrays() {
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

  filterLineChartData() {
    for (this.pos = 0; this.pos < this.lineChartData2.length; this.pos++) {
      if (this.lineChartData2[this.pos] == 0) {
        this.lineChartData2.splice(this.pos, 1);
        this.pos = 0
      }
    }
    console.log(this.lineChartData2);
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

  filterExcelData() {
    this.filteredExcelData.push(this.selectedCourse);
    this.filteredExcelData.push("Year " + this.selectedYear);
    this.filteredExcelData.push(this.fromDate);
    this.filteredExcelData.push(this.toDate);
    this.filteredExcelData.push(this.lineChartLabels2);
    this.filteredExcelData.push(this.lineChartData2);
    console.log(this.filteredExcelData);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.bookings, 'Bookings');
  }

  exportChartDataAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.filteredExcelData, 'ChartData');
  }

  today() {
    const dateFormat = 'yyyy-MM-dd';
    const today: Date = new Date();
    today.setDate(today.getDate() + 1);
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.toDate = this.datePipe.transform(date, dateFormat);
  }

  startDate() {
    const dateFormat = 'yyyy-MM-dd';
    let fromDate: Date = new Date();
    fromDate = new Date(fromDate.getFullYear(),0);
    this.fromDate = this.datePipe.transform(fromDate, dateFormat);
}

  refreshPage() {
    this.navCtrl.push("AdminStatisticsDeliveredPage");
  }

  toggleChartLine() {
    this.chartLine = false;
  }
  toggleChartBar() {
    this.chartLine = true;
  }

}

