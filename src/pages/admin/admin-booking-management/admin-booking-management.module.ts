import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminBookingManagementPage } from './admin-booking-management';
import {  NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AdminBookingManagementPage,
  ],
  imports: [
    ComponentsModule,
    NgbPaginationModule,
    TranslateModule.forChild(),
    IonicPageModule.forChild(AdminBookingManagementPage),
  ],
})
export class AdminBookingManagementPageModule {}
