import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddBookingModalPage } from './admin-add-booking-modal';

@NgModule({
  declarations: [
    AdminAddBookingModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAddBookingModalPage),
  ],
})
export class AdminAddBookingModalPageModule {}
