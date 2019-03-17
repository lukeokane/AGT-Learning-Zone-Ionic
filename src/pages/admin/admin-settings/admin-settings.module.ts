import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSettingsPage } from './admin-settings';
import { AdminSettingsSetDatePageModule } from './admin-settings-set-date/admin-settings-set-date.module';

@NgModule({
  declarations: [
    AdminSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSettingsPage)
    ],
})
export class AdminSettingsPageModule {}
