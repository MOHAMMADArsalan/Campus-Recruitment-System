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
var forms_1 = require("@angular/forms");
var customEmailValidation_1 = require("./../../customValidators/customEmailValidation");
var store_1 = require("./../../store");
var SigninContainer = (function () {
    function SigninContainer(router, fb, aa) {
        var _this = this;
        this.router = router;
        this.fb = fb;
        this.aa = aa;
        // this.loader = true;
        this.user$.subscribe(function (auth) {
            if (Object.keys(auth).length > 0) {
                _this.router.navigate(['/dashboard']);
            }
        });
        this.loginForm = this.fb.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, customEmailValidation_1.ValidateEmail])],
            password: [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
    }
    SigninContainer.prototype.ngOnInit = function () { };
    SigninContainer.prototype.onSubmit = function (loginForm) {
        if (loginForm.valid) {
            this.aa.login(loginForm.value);
        }
    };
    __decorate([
        store_1.select(['auth', 'user']), 
        __metadata('design:type', store_1.Observable)
    ], SigninContainer.prototype, "user$", void 0);
    SigninContainer = __decorate([
        core_1.Component({
            selector: 'signin',
            template: require('./signin.html'),
            styles: [require("./signin.scss"), require("./../signup/signup.scss")]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, store_1.AuthActions])
    ], SigninContainer);
    return SigninContainer;
}());
exports.SigninContainer = SigninContainer;
