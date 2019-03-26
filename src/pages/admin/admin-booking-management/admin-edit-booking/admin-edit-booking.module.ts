import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEditBookingPage } from './admin-edit-booking';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminEditBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEditBookingPage),
    TranslateModule.forChild()
  ],
})
export class AdminEditBookingPageModule {}
