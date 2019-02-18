import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItlcHomePage } from './itlc-home';

@NgModule({
  declarations: [
    ItlcHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ItlcHomePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ItlcHomePageModule {}
