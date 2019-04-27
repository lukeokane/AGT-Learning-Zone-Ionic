import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItlcModalPage } from './itlc-modal';

@NgModule({
  declarations: [
    ItlcModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ItlcModalPage),
  ],
})
export class ItlcModalPageModule {}
