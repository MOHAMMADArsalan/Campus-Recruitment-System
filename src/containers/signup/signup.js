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
var store_1 = require('../../store');
var SignupContainer = (function () {
    function SignupContainer(router, ae) {
        var _this = this;
        this.router = router;
        this.ae = ae;
        this.isError = "";
        this.registerSubscribe = this.isRegistered$.subscribe(function (result) {
            if (result) {
                // this.aa.makeRegisterFalse();
                _this.router.navigate(['/signin']);
            }
        });
        this.errorSubscribe = this.isError$.subscribe(function (response) {
            if (response.msg) {
                _this.isError = response.msg;
            }
        });
    }
    SignupContainer.prototype.ngOnDestroy = function () {
        this.registerSubscribe.unsubscribe();
        this.errorSubscribe.unsubscribe();
    };
    SignupContainer.prototype.signup = function (form) {
        this.ae.register(form);
    };
    __decorate([
        store_1.select(['auth', 'isRegistered']), 
        __metadata('design:type', store_1.Observable)
    ], SignupContainer.prototype, "isRegistered$", void 0);
    __decorate([
        store_1.select(['auth', 'isLoading']), 
        __metadata('design:type', store_1.Observable)
    ], SignupContainer.prototype, "isLoading$", void 0);
    __decorate([
        store_1.select(['auth', 'isError']), 
        __metadata('design:type', store_1.Observable)
    ], SignupContainer.prototype, "isError$", void 0);
    SignupContainer = __decorate([
        core_1.Component({
            selector: 'signup',
            template: require('./signup.html'),
            styles: [require("./signup.scss")]
        }), 
        __metadata('design:paramtypes', [router_1.Router, store_1.AuthActions])
    ], SignupContainer);
    return SignupContainer;
}());
exports.SignupContainer = SignupContainer;
