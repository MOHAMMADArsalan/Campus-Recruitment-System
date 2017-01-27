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
var core_1 = require("@angular/core");
var store_1 = require("./../../store");
var router_1 = require("@angular/router");
var AddCompanyContainer = (function () {
    function AddCompanyContainer(aa, router) {
        var _this = this;
        this.aa = aa;
        this.router = router;
        this.registerSubscribe = this.isRegistered$.subscribe(function (result) {
            if (result) {
                // this.aa.makeRegisterFalse();
                _this.router.navigate(['/dashboard']);
            }
        });
    }
    AddCompanyContainer.prototype.ngOnDestroy = function () {
        this.registerSubscribe.unsubscribe();
    };
    AddCompanyContainer.prototype.addCompany = function (company) {
        this.aa.register(company);
    };
    __decorate([
        store_1.select(['auth', 'user']), 
        __metadata('design:type', store_1.Observable)
    ], AddCompanyContainer.prototype, "user$", void 0);
    __decorate([
        store_1.select(['auth', 'isRegistered']), 
        __metadata('design:type', store_1.Observable)
    ], AddCompanyContainer.prototype, "isRegistered$", void 0);
    AddCompanyContainer = __decorate([
        core_1.Component({
            template: require("./addcompany.html"),
            styles: [require("./addcompany.scss")]
        }), 
        __metadata('design:paramtypes', [store_1.AuthActions, router_1.Router])
    ], AddCompanyContainer);
    return AddCompanyContainer;
}());
exports.AddCompanyContainer = AddCompanyContainer;
