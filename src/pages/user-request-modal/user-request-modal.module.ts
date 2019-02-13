import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRequestModalPage } from './user-request-modal';

@NgModule({
  declarations: [
    UserRequestModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRequestModalPage),
    TranslateModule.forChild()
  ],
})
export class UserRequestModalPageModule {}
