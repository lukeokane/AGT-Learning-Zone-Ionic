import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsHoursPage } from './admin-statistics-hours';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../services/excel.service';

@NgModule({
  declarations: [
    AdminStatisticsHoursPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminStatisticsHoursPage),
    ChartsModule,
  ],
  providers: [
    DatePipe,
    ExcelService,
  ]
})
export class AdminStatisticsHoursPageModule {}
