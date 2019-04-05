import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdprNoticePage } from './gdpr-notice';

@NgModule({
  declarations: [
    GdprNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(GdprNoticePage),
  ],
})
export class GdprNoticePageModule {}
