import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddTutorsPage } from './admin-add-tutors';

@NgModule({
  declarations: [
    AdminAddTutorsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAddTutorsPage),
    TranslateModule.forChild()
  ],
})
export class AdminAddTutorsPageModule {}
