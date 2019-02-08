import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminBookingAssignPage } from './admin-booking-assign';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminBookingAssignPage,
  ],
  imports: [
    ComponentsModule,
    TranslateModule.forChild(),
    NgbPaginationModule,
    IonicPageModule.forChild(AdminBookingAssignPage),
  ],
})
export class AdminBookingAssignPageModule {}
