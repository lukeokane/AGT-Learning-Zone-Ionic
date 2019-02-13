import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInfoService } from './../services/UserInfo.provider';
import { BookingsService } from './../services/Booking.provider';
import { SemesterService } from './../services/Semester.provider';
import { CourseService } from './../services/Course.provider';
import { SemesterGroupService } from './../services/SemesterGroup.provider';
import { CourseYearService } from './../services/CourseYear.provider';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Api, Settings, User } from '../providers/providers';
import { MyApp } from './app.component';
import { LoginService } from '../providers/login/login.service';
import { Principal } from '../providers/auth/principal.service';
import { AccountService } from '../providers/auth/account.service';
import { NotificationService } from '../providers/notification/notification.service';
import { AuthServerProvider } from '../providers/auth/auth-jwt.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthInterceptor } from '../providers/auth/auth-interceptor';
import { EntityPageModule } from '../pages/entities/entity.module';
import { ComponentsModule } from '../components/components.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { UserService } from '../services/User.provider';
import { SubjectsService } from '../services/Subject.provider';
import { TopicService } from '../services/Topic.provider';
import { TooltipsModule } from 'ionic-tooltips';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule.forRoot(),
    TooltipsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    EntityPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    User,
    LoginService,
    Principal,
    AccountService,
    NotificationService,
    AuthServerProvider,
    LocalStorageService,
    SessionStorageService,
    CourseService,
    CourseYearService,
    SemesterGroupService,
    SemesterService,
    BookingsService,
    UserService,
    SubjectsService,
    UserInfoService,
    TopicService,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule { }
