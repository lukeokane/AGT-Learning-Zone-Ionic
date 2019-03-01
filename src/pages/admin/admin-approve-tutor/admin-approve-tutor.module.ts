import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminApproveTutorPage } from './admin-approve-tutor';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AdminApproveTutorPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminApproveTutorPage),
    ComponentsModule
  ],
})
export class AdminApproveTutorPageModule {}
