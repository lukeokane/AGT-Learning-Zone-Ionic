import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorHomePage } from './tutor-home';

@NgModule({
  declarations: [
    TutorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TutorHomePage),
  ],
})
export class TutorHomePageModule {}
