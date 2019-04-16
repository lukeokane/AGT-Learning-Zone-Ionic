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
  
  /**
  *   Method to load all courses to the course picker
  */
  loadAll() {
    this.courseService.findAllCoursesList().subscribe(data => {
      this.courses = data.body;
    }, error => {
      console.log(error);
    });
  }
  
  /**
  *   Method to generate chart depending on the combination of requests from the tutorials delivered page
  */
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
      this.bookingsService.findAllBookingsAllCoursesSelectedYear(this.fromDate, this.toDate, this.selectedYear).subscribe(data => {
        this.bookings = data.body;
        console.log(this.bookings);
        this.filterBookingsByDate();
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
        this.filterBookingsByDate();
      }, error => {
        console.log(error);
      });
    }

    if (this.selectedCourse != "all" && this.selectedYear == "all") {
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

  /**
  *   Method to filter chart data into lists for the angular charts
  */
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
    this.filterLineChartData();
    this.filterLineChartData();
    this.filterExcelData();
    this.combineArrays();
    this.chartGenerated = true;
  }

  /**
  *   Method to get the course id from the selected course name
  *    @param dateTime
  *    @returns the date in a angular readable form from java
  */
  getMonth(dateTime) {
    const date = this.datePipe.transform(dateTime, 'MM', 'UTC');
    return date;
  }

  /**
  *   Method to to push data label and chart data into final line data for chart
  */
  combineArrays() {
    this.lineChartDataFinal.push(this.lineChartData2);
    this.lineChartDataFinal.push(this.label);
    console.log(this.lineChartDataFinal);
  }

  /**
  *   Method to get the course id from the selected course name
  *    @param month
  *    @returns boolean wheter month is alleady in the linechart labels list
  */
  checkDuplicates(month: any): boolean {
    for (let mon of this.lineChartLabels2) {
      if (mon == month) {
        return true;
      }
    }
    return false;
  }

  /**
  *   Method to splice - remove all zeros from the chart data list
  */
  filterLineChartData() {
    for (this.pos = 0; this.pos < this.lineChartData2.length; this.pos++) {
      if (this.lineChartData2[this.pos] == 0) {
        this.lineChartData2.splice(this.pos, 1);
        this.pos = 0
      }
    }
  }

  /**
  *   Method to get the course id from the selected course name
  *    @param selectedCourse
  *    @returns course id
  */
  getCourseId(selectedCourse): number {
    for (let course of this.courses) {
      if (course.title == selectedCourse) {
        this.id = course.id
      }
    }
    return this.id;
  }
   
  /**
  *   Method to export chart data to xls with details of how it was generated
  */
  filterExcelData() {
    this.filteredExcelData.push("Course " + this.selectedCourse);
    this.filteredExcelData.push("Year " + this.selectedYear);
    this.filteredExcelData.push("From " + this.fromDate);
    this.filteredExcelData.push("To " + this.toDate);
    this.filteredExcelData.push(this.lineChartLabels2);
    this.filteredExcelData.push(this.lineChartData2);
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
  *   Sets the enddate to the end of the current day
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
   
  /**
  *   refreshes page flushing out array data
  */
  refreshPage() {
    this.navCtrl.push("AdminStatisticsDeliveredPage");
  }
  
  /**
  *   Sets the Chartline to false toggling chart to a bar chart
  */
  toggleChartLine() {
    this.chartLine = false;
  }

  /**
  *   Sets the chartLine to true toggling chart to line chart
  */
  toggleChartBar() {
    this.chartLine = true;
  }

}

