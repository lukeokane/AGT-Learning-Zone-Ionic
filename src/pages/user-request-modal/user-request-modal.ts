import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, List } from 'ionic-angular';
import { Booking } from '../../class/Booking';
import { Principal } from '../../providers/auth/principal.service';
import { TouchSequence } from 'selenium-webdriver';
import { BookingUserDetails } from '../../class/BookingUserDetails';
import { UserInfoService } from '../../services/UserInfo.provider';
import { Subject } from '../../class/Subject';
import { SubjectsService } from '../../services/Subject.provider';
import { SemesterGroupService } from '../../services/SemesterGroup.provider';
import { Topic } from '../../class/Topic';
import { TopicService } from '../../services/Topic.provider';

/**
 * Generated class for the UserRequestModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-request-modal',
  templateUrl: 'user-request-modal.html',
})
export class UserRequestModalPage implements OnInit {
  dateSelected: Date;
  timeSelected: any;
  visible1: any;
  visible2: any;
  visible3: any;
  booking: Booking;
  userDetails: BookingUserDetails;
  userId: any;
  subjects: Array<Subject>;
  topics: Array<Topic>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private principal: Principal,
    private userInfoService: UserInfoService,
    // private subjectService: SubjectsService,
    private topicService: TopicService,
    private semesterGroupService: SemesterGroupService) {
    this.dateSelected = this.navParams.get("dateSelected");
    this.timeSelected = this.navParams.get("timeSelected");
    this.visible1 = true;
    this.visible2 = true;
    this.visible3 = true;
    this.booking = new Booking();
    this.userDetails = new BookingUserDetails();
    this.userId = this.principal.getUserId();
    // this.booking.bookingUserDetails
  }
  ngOnInit() {
    this.initUserInfo();
  }
  initUserInfo(refresher?) {
    this.userInfoService.find(this.userId).subscribe((response) => {
      let userInfo = response;
      if (typeof (refresher) !== 'undefined') {
        refresher.complete();
      }
      console.log(userInfo);
      this.userDetails.userInfo = userInfo;
      var semesterGroupId = userInfo.semesterGroupId;
      this.initSubject(semesterGroupId);
      // semesterGroupId
      // this.subjects = 
    },
      (error) => {
        console.error(error);
        // let toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        // toast.present();
      });
  }
  initSubject(semesterGroupId) {
    this.semesterGroupService.find(semesterGroupId).subscribe((response) => {
      this.subjects = response.subjects;
      console.log(this.subjects);
      let subjectsId: number[] = new Array(this.subjects.length)
      for (let i = 0; i < this.subjects.length; i++) {
        subjectsId[i] = this.subjects[i].id;
      }
      this.initTopic(subjectsId);
    }
    )
  }
  initTopic(subjectId) {
    this.topicService.getAllTopicsBySubjectId(subjectId).subscribe((response) => {
      console.log("res" );
      console.log(response);
      this.topics = response;
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlotModalPage');
  }
  convertToString() {
    return "Date: " + this.dateSelected.getDate() + "/" + (this.dateSelected.getMonth() + 1) + " Time:" + this.timeSelected + ":00";
  }

  onClickPriority(tyle: String, visible: any) {
    if (visible == 1) {
      this.visible1 = false;
      this.visible2 = true;
      this.visible3 = true;

    } else if (visible == 2) {
      this.visible2 = false;
      this.visible1 = true;
      this.visible3 = true;


    } else if (visible == 3) {
      this.visible3 = false;
      this.visible1 = true;
      this.visible2 = true;
    }

  }

  onClickContinue() {
    let timeSlotModal = this.modalCtrl.create("UserRequestTimeslotPage", { booking: this.booking });
    timeSlotModal.onDidDismiss(data => {
      this.viewCtrl.dismiss(data);

    });
    timeSlotModal.present();
  }
}
