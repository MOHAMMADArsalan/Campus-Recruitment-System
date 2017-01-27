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
var firebase_1 = require("./../../providers/firebase");
var router_1 = require("@angular/router");
var DashboardContainer = (function () {
    function DashboardContainer(router, ca, se, fb) {
        var _this = this;
        this.router = router;
        this.ca = ca;
        this.se = se;
        this.fb = fb;
        this.postKey = "";
        this.isPosted = false;
        this.user$.subscribe(function (user) {
            if (Object.keys(user).length > 0) {
                if (user.type === 1) {
                    _this.companies$.subscribe(function (companies) {
                        if (companies.length == 0) {
                            _this.ca.getCompany();
                        }
                    });
                    _this.students$.subscribe(function (students) {
                        if (students.length == 0) {
                            _this.se.getStudentsList();
                        }
                    });
                    _this.posts$.subscribe(function (posts) {
                        if (posts.length == 0) {
                            _this.ca.getPosts();
                        }
                    });
                }
                else if (user.type === 2) {
                    _this.posts$.subscribe(function (posts) {
                        if (posts.length == 0) {
                            _this.ca.getPostByCompany(user.uid);
                        }
                    });
                }
                else if (user.type === 3) {
                    _this.posts$.subscribe(function (posts) {
                        if (posts.length == 0) {
                            _this.ca.getPosts();
                        }
                    });
                }
            }
            else {
                _this.router.navigate(['/signin']);
            }
        });
    }
    DashboardContainer.prototype.saveMultipath = function (multipath) {
        var _this = this;
        this.fb.saveMultipath(multipath).then(function () {
            console.log("Save Multipath Data");
            _this.isPosted = true;
        }, function (err) {
            console.log("Error: ", err);
        });
    };
    DashboardContainer.prototype.getPostPushKey = function (event) {
        this.postKey = this.fb.getPushRef("/posts").key;
    };
    __decorate([
        store_1.select(['company', 'companies']), 
        __metadata('design:type', store_1.Observable)
    ], DashboardContainer.prototype, "companies$", void 0);
    __decorate([
        store_1.select(['company', 'posts']), 
        __metadata('design:type', store_1.Observable)
    ], DashboardContainer.prototype, "posts$", void 0);
    __decorate([
        store_1.select(['student', 'students']), 
        __metadata('design:type', store_1.Observable)
    ], DashboardContainer.prototype, "students$", void 0);
    __decorate([
        store_1.select(['auth', 'user']), 
        __metadata('design:type', store_1.Observable)
    ], DashboardContainer.prototype, "user$", void 0);
    __decorate([
        store_1.select(['company', 'isLoading']), 
        __metadata('design:type', store_1.Observable)
    ], DashboardContainer.prototype, "isLoading$", void 0);
    DashboardContainer = __decorate([
        core_1.Component({
            selector: "dashboard",
            template: require("./dashboard.html"),
            styles: [require("./dashboard.scss")]
        }), 
        __metadata('design:paramtypes', [router_1.Router, store_1.CompanyAction, store_1.StudentAction, firebase_1.FirebaseService])
    ], DashboardContainer);
    return DashboardContainer;
}());
exports.DashboardContainer = DashboardContainer;
