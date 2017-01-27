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
var angularfire2_1 = require('angularfire2');
require("rxjs/add/operator/take");
var AuthGuardService = (function () {
    function AuthGuardService(router, af) {
        this.router = router;
        this.af = af;
    }
    AuthGuardService.prototype.canActivate = function () {
        if (localStorage.getItem("campus-recruitment-system")) {
            return true;
        }
        else {
            this.router.navigate(['/signin']);
            return false;
        }
    };
    AuthGuardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, angularfire2_1.AngularFire])
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
