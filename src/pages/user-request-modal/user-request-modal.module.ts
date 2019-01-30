import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRequestModalPage } from './user-request-modal';

@NgModule({
  declarations: [
    UserRequestModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRequestModalPage),
  ],
})
export class UserRequestModalPageModule {}
