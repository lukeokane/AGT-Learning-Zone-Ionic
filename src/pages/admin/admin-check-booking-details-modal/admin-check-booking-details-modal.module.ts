import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCheckBookingDetailsModalPage } from './admin-check-booking-details-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminCheckBookingDetailsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCheckBookingDetailsModalPage),
    TranslateModule.forChild()

  ],
})
export class AdminCheckBookingDetailsModalPageModule {}
