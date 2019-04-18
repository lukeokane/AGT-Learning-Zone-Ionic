import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';
import { BookingsService } from '../../../services/Booking.provider';
import { Booking } from '../../../class/Booking';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../services/excel.service';
import { BookingUserDetails } from '../../../class/BookingUserDetails';

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

  ACM : string = "ACM";
  ACM2 : string = "Acm";
  meeting: string = "Meeting";
  meeting2 : string = "meeting";
  toDate: any;
  fromDate: any;
  selectedYear: string = "all";
  selectedCourse: string = "all";
  courses: Course[];
  bookings: Array<Booking>;
  bookingsStudent: BookingUserDetails[];
  bookingsStudents: BookingUserDetails[] = [];
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
  chartGenerated: boolean = false;
  courseId: number;
  id: number;
  filteredExcelData: Array<any> = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Total Hours',
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
  *   Method to get booking data from the backend depending on the combination of requests from the tutorial student hours page
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
      console.log(this.courseId);
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
  *   Method to filter chart data into lists for the angular charts gets the length of tutorial by month and multiplys by the students attended within that month
  *   By using parralell array processing 
  *   Fills a list of tutor hours attended
  *   Makes sure no duplicate months are in the barhart data labels
  *   Checks that only tutorials are used in chart data - no meetings 
  */
  filterBookingsByDate() {
    for (let booking of this.bookings) {
      if (!booking.title.includes(this.ACM) || !booking.title.includes(this.ACM2) || !booking.title.includes(this.meeting) || !booking.title.includes(this.meeting2)){
        for (this.inc = 0; this.inc < this.months.length; this.inc++) {
          if (this.getMonth(booking.startTime) == this.months[this.inc]) {
            this.tutorialLengthHours = this.tutorialLength(booking.startTime, booking.endTime);
            if (this.checkDuplicates(this.monthsName[this.inc]) == false) {
              this.barChartLabels2.push(this.monthsName[this.inc]);
            }
            this.barChartDataTutor[this.inc] += this.tutorialLengthHours;
            this.barChartDataStudent[this.inc] += this.tutorialLengthHours * booking.bookingUserDetailsDTO.length;
            console.log(booking.bookingUserDetailsDTO.length);
          }
        }
      }
    }

    this.filterTutorChartData();
    this.filterTutorChartData();
    this.filterStudentChartData();
    this.filterStudentChartData();
    this.chartGenerated = true;
    this.getBookingUserDetails();
    this.filterExcelData();
  }
  
  /**
  *    Method to date pipe read in angular by month
  *    @param dateTime
  *    @returns the date in a angular readable form from java
  */
  getMonth(dateTime) {
    const date = this.datePipe.transform(dateTime, 'MM', 'UTC');
    return date;
  }

  /**
  *   Method to get the length of a tutorial in minutes converted from java
  *    @param dateTimeStart
  *    @param dateTimeEnd
  *    @returns difference in time by hour / if 30 minutes then .5
  */
  tutorialLength(dateTimeStart, dateTimeEnd) {

    this.time1 = new Date(dateTimeEnd);
    this.time2 = new Date(dateTimeStart);
    this.timeParse = (this.time1 - this.time2);
    this.diffHours = (this.timeParse % 86400000) / 3600000;
    console.log(this.diffHours);

    return this.diffHours;
  }
   

  /**
  *   Method to get the course id from the selected course name
  *    @param month
  *    @returns boolean whether month is alleady in the linechart labels list
  */
  checkDuplicates(month: any): boolean {
    for (let mon of this.barChartLabels2) {
      if (mon == month) {
        return true;
      }
    }
    return false;
  }
   
  /**
  *   Method to splice - remove all zeros from the tutor chart data list
  */
  filterTutorChartData() {
    for (this.pos = 0; this.pos < this.barChartDataTutor.length; this.pos++) {
      if (this.barChartDataTutor[this.pos] == 0) {
        this.barChartDataTutor.splice(this.pos, 1);
        this.pos = 0;
      }
    }

  }
  
  /**
  *   Method to splice - remove all zeros from the student chart data list
  */
  filterStudentChartData() {
    for (this.pos2 = 0; this.pos2 < this.barChartDataStudent.length; this.pos2++) {
      if (this.barChartDataStudent[this.pos2] == 0) {
        this.barChartDataStudent.splice(this.pos2, 1);
        this.pos2 = 0;
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
        this.id = course.id;
      }
    }
    return this.id;
  }
  
  /**
  *   Method to fill students attended array from the generated bookings . Done in preparation for excel export
  */
  getBookingUserDetails() {
    for (let booking of this.bookings) {
      for (let But of booking.bookingUserDetailsDTO) {
        if (booking.bookingUserDetailsDTO !== undefined) {
          this.bookingsStudents.push(But);
        }
      }
    }

  }
   
  /**
  *   Method to fill chart data list before generating in xls
  */
  filterExcelData() {
    this.filteredExcelData.push(this.selectedCourse);
    this.filteredExcelData.push("Year " + this.selectedYear);
    this.filteredExcelData.push("From " + this.fromDate);
    this.filteredExcelData.push("To   " + this.toDate);
    this.filteredExcelData.push(this.barChartLabels2);
    this.filteredExcelData.push(this.barChartDataTutor);
    this.filteredExcelData.push(this.barChartDataStudent);

  }
  
  /**
  *   Method to export booking data and booking User Details in xls format
  */
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.bookings, 'Bookings');
    this.excelService.exportAsExcelFile(this.bookingsStudents, 'Students Attended');

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
    this.navCtrl.push("AdminStatisticsHoursPage");
  }
}
