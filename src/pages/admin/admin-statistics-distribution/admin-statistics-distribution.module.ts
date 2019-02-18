import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsDistributionPage } from './admin-statistics-distribution';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    AdminStatisticsDistributionPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminStatisticsDistributionPage),
    ChartsModule,
  ],
})
export class AdminStatisticsDistributionPageModule {}
