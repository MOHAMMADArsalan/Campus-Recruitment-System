import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { NgReduxModule } from 'ng2-redux';
import { AngularFireModule } from 'angularfire2';
import { StoreModule, AuthActions } from '../store';
import { RootContainer } from '../containers/root/root';
import { ApplicationComponents, AppRoutes } from './routes';
import { providers } from '../providers';
import { Pipes } from "../pipes"
import { appConfig } from './appConfig';
import { EqualValidator } from '../directives/equal-validator.directive';

@NgModule({
  imports: [
    BrowserModule
    , RouterModule.forRoot(AppRoutes)
    , FormsModule
    , ReactiveFormsModule
    , HttpModule
    , NgReduxModule
    , StoreModule
    , AngularFireModule.initializeApp(appConfig.config.firebaseConfig, appConfig.config.firebaseAuthConfig)
  ]
  , declarations: [RootContainer, EqualValidator, ...ApplicationComponents, ...Pipes]
  , providers: [...providers]
  , entryComponents: []
  , bootstrap: [RootContainer]
})
export class AppModule {
  constructor(private aa: AuthActions) {
    this.aa.isLoggedIn();
  }
}
