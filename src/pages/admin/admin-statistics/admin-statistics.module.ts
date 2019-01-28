import { NgModule, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminStatisticsPage } from './admin-statistics';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AdminStatisticsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AdminStatisticsPage),
  ],
})
export class AdminStatisticsPageModule {}
