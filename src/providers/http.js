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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.GetHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions();
        options.headers = headers;
        return options;
    };
    HttpService.prototype.ResponseMap = function (res) {
        var response = res.json();
        if (response && response.hasOwnProperty('statusCode')) {
            return response;
        }
        else {
            return {
                statusCode: false,
                statusDesc: response,
            };
        }
    };
    HttpService.prototype.get = function (url) {
        return this.http.get(url).map(this.ResponseMap);
    };
    HttpService.prototype.post = function (url, obj) {
        return this.http.post(url, JSON.stringify(obj), this.GetHeaders()).map(this.ResponseMap);
    };
    HttpService.prototype.put = function (url, obj) {
        return this.http.put(url, JSON.stringify(obj), this.GetHeaders()).map(this.ResponseMap);
    };
    HttpService.prototype.PutRequestS3 = function (url, obj) {
        var headers = new http_1.Headers();
        headers.append('x-amz-acl', 'public-read');
        var options = new http_1.RequestOptions();
        options.headers = headers;
        return this.http.put(url, obj, options);
    };
    HttpService.prototype.delete = function (url) {
        return this.http.delete(url).map((this.ResponseMap));
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
