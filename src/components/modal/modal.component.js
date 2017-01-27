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
var forms_1 = require("@angular/forms");
var providers_1 = require("./../../providers");
var ModalComponent = (function () {
    function ModalComponent(myElement, _fb, fb) {
        this._fb = _fb;
        this.fb = fb;
        this.saveMultipath = new core_1.EventEmitter();
        this.postForm = _fb.group({
            title: ["", forms_1.Validators.required],
            desc: ['', forms_1.Validators.required],
            salary: ['', forms_1.Validators.required]
        });
    }
    ModalComponent.prototype.onSubmit = function (form) {
        if (form.valid) {
            var multipath = {};
            var Obj = form.value;
            Obj['applied-count'] = 0;
            Obj['timestamp'] = this.fb.firebaseTimeStamp;
            Obj['name'] = this.currentUser.name;
            Obj['address'] = this.currentUser.address;
            Obj['email'] = this.currentUser.email;
            Obj['applied'] = "";
            multipath[("company-posts/" + this.currentUser.auth.uid + "/" + this.pushKey)] = Obj;
            var newObj = Object.assign({}, Obj);
            newObj['created-by'] = this.currentUser.auth.uid;
            multipath[("posts/" + this.pushKey)] = newObj;
            this.saveMultipath.emit(multipath);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ModalComponent.prototype, "IsPrivate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalComponent.prototype, "pushKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "currentUser", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalComponent.prototype, "saveMultipath", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            template: require("./modal.component.html"),
            styles: [require("./modal.scss"), require("./../../containers/signup/signup.scss")]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, forms_1.FormBuilder, providers_1.FirebaseService])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
