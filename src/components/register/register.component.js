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
var forms_1 = require("@angular/forms");
var customEmailValidation_1 = require("./../../customValidators/customEmailValidation");
var RegisterContainer = (function () {
    function RegisterContainer(router, fb, ae) {
        this.router = router;
        this.fb = fb;
        this.ae = ae;
        this.isError = "";
        this.isCompanyRoute = false;
        this.viewLoaded = false;
        this.register = new core_1.EventEmitter();
        this.saveMultipath = new core_1.EventEmitter();
    }
    RegisterContainer.prototype.ngOnChanges = function (changes) {
        if (this.router.url == '/addcompany') {
            this.isCompanyRoute = true;
            this.signupForm = this.fb.group({
                name: [null, forms_1.Validators.required],
                address: [null, forms_1.Validators.required],
                email: [null, forms_1.Validators.compose([customEmailValidation_1.ValidateEmail, forms_1.Validators.required])],
                password: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)])]
            });
        }
        else if (this.isProfile) {
            if (this.currentUser.type === 2) {
                this.signupForm = this.fb.group({
                    name: [this.currentUser.name, forms_1.Validators.required],
                    address: [this.currentUser.address, forms_1.Validators.required],
                    email: [{ value: this.currentUser.email, disabled: true }]
                });
            }
            else if (this.currentUser.type === 3) {
                this.signupForm = this.fb.group({
                    name: [this.currentUser.name, forms_1.Validators.required],
                    firstname: [this.currentUser.firstname, forms_1.Validators.required],
                    lastname: [this.currentUser.lastname, forms_1.Validators.required],
                    gpa: [this.currentUser.gpa, forms_1.Validators.required],
                    year: [this.currentUser.year, forms_1.Validators.required],
                    email: [{ value: this.currentUser.email, disabled: true }],
                });
            }
        }
        else {
            this.signupForm = this.fb.group({
                name: [null, forms_1.Validators.required],
                firstname: [null, forms_1.Validators.required],
                lastname: [null, forms_1.Validators.required],
                email: [null, forms_1.Validators.compose([customEmailValidation_1.ValidateEmail, forms_1.Validators.required])],
                password: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)])]
            });
        }
        this.viewLoaded = true;
    };
    RegisterContainer.prototype.add = function (form) {
        event.preventDefault();
        if (form.valid) {
            if (this.isProfile) {
                var multipath = {};
                var obj = form.value;
                obj['type'] = this.currentUser.type;
                obj['email'] = this.currentUser.email;
                if (form.value.gpa && form.value.year) {
                    obj['status'] = true;
                }
                if (this.currentUser.type == 2) {
                    multipath[("companies/" + this.currentUser.auth.uid)] = obj;
                }
                multipath[("users/" + this.currentUser.auth.uid)] = obj;
                this.saveMultipath.emit(multipath);
            }
            else {
                if (this.isCompanyRoute) {
                    form.value['type'] = 2;
                }
                else {
                    form.value['type'] = 3;
                    form.value['gpa'] = "";
                    form.value['year'] = "";
                    form.value['status'] = false;
                }
                this.register.emit(form.value);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RegisterContainer.prototype, "isProfile", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RegisterContainer.prototype, "currentUser", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RegisterContainer.prototype, "register", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RegisterContainer.prototype, "saveMultipath", void 0);
    RegisterContainer = __decorate([
        core_1.Component({
            selector: 'register',
            template: require('./register.component.html'),
            styles: [require("./register.component.scss")]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, store_1.AuthActions])
    ], RegisterContainer);
    return RegisterContainer;
}());
exports.RegisterContainer = RegisterContainer;
