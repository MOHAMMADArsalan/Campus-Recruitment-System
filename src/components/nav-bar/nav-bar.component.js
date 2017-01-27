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
var NavBarComponent = (function () {
    function NavBarComponent(aa) {
        this.aa = aa;
    }
    NavBarComponent.prototype.Logout = function () {
        this.aa.logout();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NavBarComponent.prototype, "currentUser", void 0);
    NavBarComponent = __decorate([
        core_1.Component({
            selector: "nav-bar",
            template: require("./nav-bar.component.html"),
            styles: [
                require("./nav-bar.component.scss"),
                require("./../nav-login/nav-login.component.scss"),
                require("./../../config/root.scss")]
        }), 
        __metadata('design:paramtypes', [store_1.AuthActions])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
