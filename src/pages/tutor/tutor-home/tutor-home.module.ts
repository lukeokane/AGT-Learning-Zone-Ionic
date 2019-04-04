import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorHomePage } from './tutor-home';

@NgModule({
  declarations: [
    TutorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TutorHomePage),
    ComponentsModule
  ],
})
export class TutorHomePageModule {}
