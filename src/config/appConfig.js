"use strict";
var angularfire2_1 = require('angularfire2');
var AppConfig = (function () {
    function AppConfig(env) {
        if (env === void 0) { env = 'dev'; }
        if (env === 'dev') {
            this.config = {
                'firebaseConfig': {
                    apiKey: "AIzaSyDt4iyN5Z7R3ipQH-niVxU6datrLfgWcmg",
                    authDomain: "campus-recruitment-system.firebaseapp.com",
                    databaseURL: "https://campus-recruitment-system.firebaseio.com",
                    storageBucket: "campus-recruitment-system.appspot.com",
                    messagingSenderId: "837785737302"
                },
                firebaseAuthConfig: { provider: angularfire2_1.AuthProviders.Password, method: angularfire2_1.AuthMethods.Password }
            };
        }
        else {
        }
    }
    return AppConfig;
}());
exports.AppConfig = AppConfig;
exports.appConfig = new AppConfig('dev');
