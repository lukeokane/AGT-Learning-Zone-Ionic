import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRequestSendTutorialPage } from './user-request-send-tutorial';

@NgModule({
  declarations: [
    UserRequestSendTutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRequestSendTutorialPage),
  ],
})
export class UserRequestSendTutorialPageModule {}
