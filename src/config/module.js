"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_redux_1 = require('ng2-redux');
var angularfire2_1 = require('angularfire2');
var store_1 = require('../store');
var root_1 = require('../containers/root/root');
var routes_1 = require('./routes');
var providers_1 = require('../providers');
var pipes_1 = require("../pipes");
var appConfig_1 = require('./appConfig');
var equal_validator_directive_1 = require('../directives/equal-validator.directive');
var AppModule = (function () {
    function AppModule(aa) {
        this.aa = aa;
        this.aa.isLoggedIn();
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes_1.AppRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                ng2_redux_1.NgReduxModule,
                store_1.StoreModule,
                angularfire2_1.AngularFireModule.initializeApp(appConfig_1.appConfig.config.firebaseConfig, appConfig_1.appConfig.config.firebaseAuthConfig)
            ],
            declarations: [root_1.RootContainer, equal_validator_directive_1.EqualValidator].concat(routes_1.ApplicationComponents, pipes_1.Pipes),
            providers: providers_1.providers.slice(),
            entryComponents: [],
            bootstrap: [root_1.RootContainer]
        }), 
        __metadata('design:paramtypes', [store_1.AuthActions])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
