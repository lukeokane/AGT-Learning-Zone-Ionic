import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddBookingPage } from './admin-add-booking';

@NgModule({
  declarations: [
    AdminAddBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAddBookingPage),
  ],
})
export class AdminAddBookingPageModule {}
