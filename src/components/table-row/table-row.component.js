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
var providers_1 = require("./../../providers");
var TableRowComponent = (function () {
    function TableRowComponent(fb) {
        this.fb = fb;
        this.deleteData = new core_1.EventEmitter();
        this.saveMultipath = new core_1.EventEmitter();
    }
    TableRowComponent.prototype.keys = function (object) {
        return object ? Object.keys(object) : [];
    };
    TableRowComponent.prototype.delete = function (key, id, type) {
        var multipath = {};
        multipath[("posts/" + key)] = null;
        multipath[("company-posts/" + id + "/" + key)] = null;
        this.deleteData.emit(multipath);
    };
    TableRowComponent.prototype.apply = function (key, companyId, count) {
        if (this.currentUser.status) {
            var multipath = {};
            var userObj = {};
            userObj['email'] = this.currentUser.email;
            userObj['name'] = this.currentUser.name;
            userObj['firstname'] = this.currentUser.firstname;
            userObj['lastname'] = this.currentUser.lastname;
            userObj['uid'] = this.currentUser.auth.uid;
            multipath[("posts/" + key + "/applied/" + this.currentUser.auth.uid)] = userObj;
            multipath[("company-posts/" + companyId + "/" + key + "/applied-count")] = count + 1;
            multipath[("company-posts/" + companyId + "/" + key + "/applied/" + this.currentUser.auth.uid)] = userObj;
            multipath[("posts/" + key + "/applied-count")] = count + 1;
            this.saveMultipath.emit(multipath);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableRowComponent.prototype, "currentUser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableRowComponent.prototype, "companylist", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableRowComponent.prototype, "studentslist", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableRowComponent.prototype, "postslist", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TableRowComponent.prototype, "type", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableRowComponent.prototype, "deleteData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableRowComponent.prototype, "saveMultipath", void 0);
    TableRowComponent = __decorate([
        core_1.Component({
            selector: "[table-row]",
            template: require("./table-row.component.html"),
            styles: [require("./table-row.component.scss")]
        }), 
        __metadata('design:paramtypes', [providers_1.FirebaseService])
    ], TableRowComponent);
    return TableRowComponent;
}());
exports.TableRowComponent = TableRowComponent;
