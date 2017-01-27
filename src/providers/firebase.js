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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var fb = require('firebase');
var angularfire2_1 = require('angularfire2');
var FirebaseService = (function () {
    function FirebaseService(fbApp, af) {
        this.fbApp = fbApp;
        this.af = af;
        this.firebaseTimeStamp = fb.database['ServerValue'].TIMESTAMP;
        this.ref = this.fbApp.database().ref();
        this.storage = this.fbApp.storage().ref();
        this.auth = this.fbApp.auth();
    }
    FirebaseService.prototype.saveMultipath = function (multipath) {
        return this.ref.update(multipath);
    }; // saveMultipath
    FirebaseService.prototype.getPushRef = function (path) {
        return this.ref.child(path).push();
    };
    FirebaseService.prototype.uploadImageOnStorageBase64 = function (path, image) {
        var _this = this;
        return new Promise(function (res) {
            _this.storage.child(path).putString(image, 'base64')
                .then(function (snapshot) {
                console.log('Uploaded a base64 string!');
                // The promise will resolve with a Download URL provided by Firebase Storage
                res(snapshot.downloadURL);
            });
        });
    };
    FirebaseService.prototype.uploadImageOnStorageBlob = function (path, blob) {
        var _this = this;
        return new Promise(function (res) {
            _this.storage.child(path).put(blob).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
                // The promise will resolve with a Download URL provided by Firebase Storage
                res(snapshot.downloadURL);
            });
        });
    };
    FirebaseService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(angularfire2_1.FirebaseApp)), 
        __metadata('design:paramtypes', [Object, angularfire2_1.AngularFire])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
// export const firebase = new FirebaseService(); 
