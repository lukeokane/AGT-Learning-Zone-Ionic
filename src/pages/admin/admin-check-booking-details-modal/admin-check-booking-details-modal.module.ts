import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCheckBookingDetailsModalPage } from './admin-check-booking-details-modal';

@NgModule({
  declarations: [
    AdminCheckBookingDetailsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCheckBookingDetailsModalPage),
  ],
})
export class AdminCheckBookingDetailsModalPageModule {}
