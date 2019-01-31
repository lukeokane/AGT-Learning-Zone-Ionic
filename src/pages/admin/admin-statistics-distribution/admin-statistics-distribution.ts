import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { CourseService } from '../../../providers/course/course.service';
import { CourseService } from '../../../services/Course.provider';
import { Course } from '../../../class/Course';
import { ToastController } from 'ionic-angular';
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

  toDate: string;
  fromDate: string;
  selectedYear: any;
  courses: Course[];
  selectedCourse: Course;

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
    console.log(this.toDate);
    console.log(this.fromDate);
    console.log(this.selectedYear);
    console.log(this.selectedCourse);
  }

}
