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
                    apiKey: "AIzaSyDt4iyN5Z7R3ipQH-niVxU6datrLfgWcmg",
                    authDomain: "campus-recruitment-system.firebaseapp.com",
                    databaseURL: "https://campus-recruitment-system.firebaseio.com",
                    storageBucket: "campus-recruitment-system.appspot.com",
                    messagingSenderId: "837785737302"
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
