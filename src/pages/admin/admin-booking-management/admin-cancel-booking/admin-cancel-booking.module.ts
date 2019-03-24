import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCancelBookingPage } from './admin-cancel-booking';

@NgModule({
  declarations: [
    AdminCancelBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCancelBookingPage),
  ],
})
export class AdminCancelBookingPageModule {}
