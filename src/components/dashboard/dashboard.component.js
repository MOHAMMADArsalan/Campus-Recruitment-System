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
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.tab = 'company';
        this.isShow = false;
        this.deleteData = new core_1.EventEmitter();
        this.getPostPushKey = new core_1.EventEmitter();
        this.saveMultipath = new core_1.EventEmitter();
    }
    DashboardComponent.prototype.ngOnChanges = function (Changes) {
        if (Changes.isPosted && Changes.isPosted.currentValue) {
            $("#myModal").modal('hide');
            this.isShow = false;
        }
    };
    DashboardComponent.prototype.checkLength = function (object) {
        return Object.keys(object).length === 0 ? true : false;
    };
    DashboardComponent.prototype.showData = function (tab) {
        this.tab = tab;
    };
    DashboardComponent.prototype.delete = function (event) {
        this.deleteData.emit(event);
    };
    DashboardComponent.prototype.Changes = function () {
        this.getPostPushKey.emit(this.currentUser.auth.uid);
    };
    DashboardComponent.prototype.saveMultipathHandler = function (event) {
        this.saveMultipath.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "companies", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DashboardComponent.prototype, "isLoading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "students", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "posts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "currentUser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashboardComponent.prototype, "postPushKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashboardComponent.prototype, "isPosted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "deleteData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "getPostPushKey", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardComponent.prototype, "saveMultipath", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: "dashboard-component",
            template: require("./dashboard.component.html"),
            styles: [require("./dashboard.component.scss"), require("./../../config/root.scss")]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
