import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
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
    ComponentsModule,
    TranslateModule.forChild(),
    NgbPaginationModule,
  ],
})
export class AdminApproveTutorPageModule {}
