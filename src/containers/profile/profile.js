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
var router_1 = require('@angular/router');
var store_1 = require("./../../store");
var providers_1 = require("./../../providers");
var ProfileContainer = (function () {
    function ProfileContainer(fb, router, aa) {
        this.fb = fb;
        this.router = router;
        this.aa = aa;
    }
    ProfileContainer.prototype.ngOnInit = function () { };
    ProfileContainer.prototype.saveMultipathHandler = function (multipathObj) {
        this.fb.saveMultipath(multipathObj).then(function () {
            console.log("UpdatYed", multipathObj);
        }, function (err) {
            console.log("Error: ", err);
        });
    };
    __decorate([
        store_1.select(['auth', 'user']), 
        __metadata('design:type', store_1.Observable)
    ], ProfileContainer.prototype, "user$", void 0);
    ProfileContainer = __decorate([
        core_1.Component({
            selector: 'profile',
            template: require('./profile.html'),
            styles: [require("./../signin/signin.scss"), require("./../signup/signup.scss"), require("./profile.scss")]
        }), 
        __metadata('design:paramtypes', [providers_1.FirebaseService, router_1.Router, store_1.AuthActions])
    ], ProfileContainer);
    return ProfileContainer;
}());
exports.ProfileContainer = ProfileContainer;
