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
var index_1 = require("./../../store/index");
var TableComponent = (function () {
    function TableComponent() {
        this.deleteData = new core_1.EventEmitter();
        this.saveMultipath = new core_1.EventEmitter();
    }
    TableComponent.prototype.deleteDataHandler = function (event) {
        this.deleteData.emit(event);
    };
    TableComponent.prototype.saveMultipathHandler = function (event) {
        this.saveMultipath.emit(event);
    };
    __decorate([
        index_1.select(['auth', 'user']), 
        __metadata('design:type', index_1.Observable)
    ], TableComponent.prototype, "currentUser$", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TableComponent.prototype, "isLoading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TableComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableComponent.prototype, "deleteData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableComponent.prototype, "saveMultipath", void 0);
    TableComponent = __decorate([
        core_1.Component({
            selector: "data-table",
            template: require("./table.component.html"),
            styles: [require("../../config/root.scss")]
        }), 
        __metadata('design:paramtypes', [])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
