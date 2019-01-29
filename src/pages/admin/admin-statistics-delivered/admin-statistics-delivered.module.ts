import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsDeliveredPage } from './admin-statistics-delivered';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    AdminStatisticsDeliveredPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminStatisticsDeliveredPage),
    ChartsModule,
  ],
})
export class AdminStatisticsDeliveredPageModule {}
