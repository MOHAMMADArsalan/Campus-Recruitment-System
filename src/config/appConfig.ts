import { AuthProviders, AuthMethods } from 'angularfire2';

export class AppConfig {
    config: {
        firebaseConfig: { apiKey: string, authDomain: string, databaseURL: string, storageBucket: string, messagingSenderId: string },
        firebaseAuthConfig: { provider: any, method: any };
    };

    constructor(env: string = 'dev') {
        if (env === 'dev') {
            this.config = {
                'firebaseConfig': {
                   apiKey: "AIzaSyCOlUbw1Ri-9T4s_SY2RXcbU9XcmSWx570",
                   authDomain: "parking-system-11d64.firebaseapp.com",
                   databaseURL: "https://parking-system-11d64.firebaseio.com",
                   storageBucket: "parking-system-11d64.appspot.com",
                   messagingSenderId: "333338831728"
                },
                firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            };
        } else {
            // this.config = {
            //     'firebaseConfig': {
            //     },
            //     firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            // };
        }
    }
}

export let appConfig = new AppConfig('dev');
