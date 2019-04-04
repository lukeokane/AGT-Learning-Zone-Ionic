import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsDeliveredPage } from './admin-statistics-delivered';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../services/excel.service';
import 'chartjs-plugin-datalabels'

@NgModule({
  declarations: [
    AdminStatisticsDeliveredPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminStatisticsDeliveredPage),
    ChartsModule,
  ], providers: [
    DatePipe,
    ExcelService,
  ]
})
export class AdminStatisticsDeliveredPageModule {}
