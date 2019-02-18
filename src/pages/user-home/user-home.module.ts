import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHomePage } from './user-home';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserHomePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UserHomePage),
    TranslateModule.forChild()

  ],
})
export class UserHomePageModule {}
