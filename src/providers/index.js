"use strict";
var http_1 = require('./http');
exports.HttpService = http_1.HttpService;
var authGuard_1 = require('./authGuard');
exports.AuthGuardService = authGuard_1.AuthGuardService;
var firebase_1 = require('./firebase');
exports.FirebaseService = firebase_1.FirebaseService;
exports.providers = [
    http_1.HttpService,
    authGuard_1.AuthGuardService,
    firebase_1.FirebaseService
];
