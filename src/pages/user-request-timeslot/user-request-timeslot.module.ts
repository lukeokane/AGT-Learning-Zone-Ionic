import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRequestTimeslotPage } from './user-request-timeslot';

@NgModule({
  declarations: [
    UserRequestTimeslotPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRequestTimeslotPage),
  ],
})
export class UserRequestTimeslotPageModule {}
