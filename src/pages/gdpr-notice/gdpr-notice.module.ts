import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdprNoticePage } from './gdpr-notice';

@NgModule({
  declarations: [
    GdprNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(GdprNoticePage),
    ComponentsModule
  ],
})
export class GdprNoticePageModule {}
