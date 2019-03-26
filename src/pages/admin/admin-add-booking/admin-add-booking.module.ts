import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddBookingPage } from './admin-add-booking';

@NgModule({
  declarations: [
    AdminAddBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAddBookingPage),
    TranslateModule.forChild()
  ],
})
export class AdminAddBookingPageModule {}
