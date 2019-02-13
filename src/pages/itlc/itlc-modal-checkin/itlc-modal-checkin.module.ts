import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItlcModalCheckinPage } from './itlc-modal-checkin';

@NgModule({
  declarations: [
    ItlcModalCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(ItlcModalCheckinPage),
    TranslateModule.forChild()
  ],
})
export class ItlcModalCheckinPageModule {}
