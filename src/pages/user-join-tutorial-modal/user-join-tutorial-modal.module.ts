import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserJoinTutorialModalPage } from './user-join-tutorial-modal';

@NgModule({
  declarations: [
    UserJoinTutorialModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserJoinTutorialModalPage),
  ],
})
export class UserJoinTutorialModalPageModule {}
