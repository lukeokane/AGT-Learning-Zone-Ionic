import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsPage } from './admin-statistics';
import { ComponentsModule } from '../../../components/components.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    AdminStatisticsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AdminStatisticsPage),
    ChartsModule,
  ],
})
export class AdminStatisticsPageModule {}
