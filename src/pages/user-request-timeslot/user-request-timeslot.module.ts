import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRequestTimeslotPage } from './user-request-timeslot';

@NgModule({
  declarations: [
    UserRequestTimeslotPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRequestTimeslotPage),
    TranslateModule.forChild()
  ],
})
export class UserRequestTimeslotPageModule {}
