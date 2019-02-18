import { LoginService } from './../../providers/login/login.service';
import { Component } from '@angular/core';
import { PopoverController, NavController } from 'ionic-angular';
import { loginPage } from '../../pages/pages';

@Component({
  selector: 'top-menu',
  templateUrl: 'top-menu.html'
})
export class TopMenuComponent {

  text: string;

  constructor(public popoverCtrl: PopoverController,
    private loginService:LoginService,
    private navCtrl:NavController
    ) {
  }

  showNotifications(myEvent) {
    console.log(myEvent);
    const popover = this.popoverCtrl.create("PopoverNotificationPage", {}, { cssClass: 'custom-popover' });
    // myEvent={
    //   target : {
    //     getBoundingClientRect : () => {
    //       return {
    //         top: '100'
    //       };
    //     }
    //   }
    // };

    // const popover = this.popoverCtrl.create({PopoverNotificationPage,  { cssClass: 'custom-popover' }});
    popover.present({ ev: myEvent });
  }
  logout() {
    console.log("Logout: " );
    this.loginService.logout();
    this.navCtrl.setRoot(loginPage);

    // this.authServerProvider.logout().subscribe((data) => {
    //   console.log("Logout: " + data);
    //   // this.app.getRootNavs()[0].setRoot(loginPage);
    //   var nav = this.app.getRootNav();
    //   console.log(nav);
    //   nav.setRoot(FirstRunPage);
    // }, (err) => {
    // });
  }

}
