import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminBookingManagementPage } from './admin-booking-management';

@NgModule({
  declarations: [
    AdminBookingManagementPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AdminBookingManagementPage),
  ],
})
export class AdminBookingManagementPageModule {}
