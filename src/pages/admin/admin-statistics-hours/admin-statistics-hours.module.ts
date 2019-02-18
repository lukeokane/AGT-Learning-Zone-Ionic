import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsHoursPage } from './admin-statistics-hours';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    AdminStatisticsHoursPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminStatisticsHoursPage),
    ChartsModule,
  ],
})
export class AdminStatisticsHoursPageModule {}
