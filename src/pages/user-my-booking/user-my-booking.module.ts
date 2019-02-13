import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyBookingPage } from './user-my-booking';

@NgModule({
  declarations: [
    UserMyBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyBookingPage),
  ],
})
export class UserMyBookingPageModule {}
