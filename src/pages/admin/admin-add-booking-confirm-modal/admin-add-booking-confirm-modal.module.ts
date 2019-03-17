import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddBookingConfirmModalPage } from './admin-add-booking-confirm-modal';

@NgModule({
  declarations: [
    AdminAddBookingConfirmModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAddBookingConfirmModalPage),
  ],
})
export class AdminAddBookingConfirmModalPageModule {}
