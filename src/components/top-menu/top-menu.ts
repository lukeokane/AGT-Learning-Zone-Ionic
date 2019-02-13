import { Component } from '@angular/core';
import { PopoverController, App } from 'ionic-angular';
import { AuthServerProvider } from '../../providers/auth/auth-jwt.service';
import { FirstRunPage } from '../../pages/pages';

@Component({
  selector: 'top-menu',
  templateUrl: 'top-menu.html'
})
export class TopMenuComponent {

  text: string;

  constructor(public popoverCtrl: PopoverController,
    private authServerProvider: AuthServerProvider,
    private app: App) {
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

    this.authServerProvider.logout().subscribe((data) => {
      console.log("Logout: " + data);
      // this.app.getRootNavs()[0].setRoot(loginPage);
      var nav = this.app.getRootNav();
      console.log(nav);
      nav.setRoot(FirstRunPage);
    }, (err) => {
    });
  }

}
