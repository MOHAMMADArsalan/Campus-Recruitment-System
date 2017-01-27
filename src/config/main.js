"use strict";
require('reflect-metadata');
require('core-js');
require('zone.js/dist/zone');
require("jquery");
require("bootstrap");
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var module_1 = require('./module');
document.addEventListener('DOMContentLoaded', function main() {
    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(module_1.AppModule);
});
