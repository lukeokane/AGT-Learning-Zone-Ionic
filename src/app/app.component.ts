import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { MainPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { Principal } from '../providers/auth/principal.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = MainPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    // { title: 'Welcome', component: 'WelcomePage' },
    // { title: 'Tabs', component: 'TabsPage' },
    { title: 'Home', component: 'HomePage', role: "ROLE_ADMIN" },
    { title: 'Tutor Management', component: 'AdminApproveTutorPage', role: "ROLE_ADMIN" },
    { title: 'Manage Bookings', component: 'AdminBookingManagementPage', role: "ROLE_ADMIN" },
    // { title: 'Signup', component: 'SignupPage' },
    // { title: 'Menu', component: 'MenuPage' },
    { title: 'Statistics', component: 'AdminStatisticsPage', role: "ROLE_ADMIN" },
    { title: 'Settings', component: 'AdminSettingsPage', role: "ROLE_ADMIN" },
    { title: 'Home', component: 'UserHomePage', role: "ROLE_USER" },
    { title: 'My Booking', component: 'UserMyBookingPage', role: "ROLE_USER" }
  ];

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config,
    private statusBar: StatusBar, private splashScreen: SplashScreen,
    private principal: Principal) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }
  checkAdminRole(p) {
    if (this.principal.userIdentity != undefined && this.principal.userIdentity != null) {
      if (this.principal.userIdentity.authorities.some(value => {
        return value == "ROLE_ADMIN";
      })) {
        if (p.role == "ROLE_ADMIN") {
          return true;
        }
      } else {
        return this.principal.userIdentity.authorities.some(value => {
          return value == p.role;
        });
      }

    } else {
      return false;
    }
  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
