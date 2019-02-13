import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserJoinTutorialModalPage } from './user-join-tutorial-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserJoinTutorialModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserJoinTutorialModalPage),
    TranslateModule.forChild()

  ],
})
export class UserJoinTutorialModalPageModule {}
