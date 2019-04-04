import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsDistributionPage } from './admin-statistics-distribution';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ExcelService } from '../../../services/excel.service';
import 'chart.piecelabel.js';
import 'chartjs-plugin-datalabels'


@NgModule({
  declarations: [
    AdminStatisticsDistributionPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminStatisticsDistributionPage),
    ChartsModule,
  ],
  providers: [
    ExcelService,
  ]
})
export class AdminStatisticsDistributionPageModule {}
