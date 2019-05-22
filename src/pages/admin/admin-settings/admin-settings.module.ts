import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSettingsPage } from './admin-settings';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AdminSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSettingsPage),
    ComponentsModule
    ],
})
export class AdminSettingsPageModule {}
