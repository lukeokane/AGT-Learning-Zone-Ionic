import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEditBookingPage } from './admin-edit-booking';

@NgModule({
  declarations: [
    AdminEditBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEditBookingPage),
  ],
})
export class AdminEditBookingPageModule {}
