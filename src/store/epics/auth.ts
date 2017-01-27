import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { ActionsObservable } from "redux-observable";
import { AuthActions } from '../actions';
import { FirebaseService } from "./../../providers"

@Injectable()
export class AuthEpics {
  constructor(private af: AngularFire, private fb: FirebaseService) { }

  register = (action$) =>
    action$.ofType(AuthActions.SIGN_UP)
      .switchMap(({payload}): any => {
        return this.af.auth.createUser({ email: payload.email, password: payload.password }).then((response) => {
          let multipath = {};
          let users = this.af.database.object(`users/${response.uid}`);
          delete payload['password'];
          return users.set(payload).then(() => {
            return {
              type: AuthActions.SIGN_UP_SUCCESS,
              payload: response
            };
          }, (err) => {
            return {
              type: AuthActions.SIGN_UP_FAIL,
              payload: { isError: { status: false, msg: err.message } }
            };
          });
        }, (err) => {
          return {
            type: AuthActions.SIGN_UP_FAIL,
            payload: { isError: { status: false, msg: err.message } }
          };
        });
      })

  login = (action$) =>
    action$.ofType(AuthActions.LOGIN)
      .switchMap(({payload}): any =>
        this.af.auth.login({ email: payload.email, password: payload.password },
          { provider: AuthProviders.Password, method: AuthMethods.Password }).then((auth) => {
            this.setLocalStorage(auth)
            return {
              type: AuthActions.GET_USER_INFO,
              payload: auth
            };
          }, (err) => {
            return {
              type: AuthActions.LOGIN_FAIL,
              payload: {}
            };
          })
      );
  getUserInfo = (action$: ActionsObservable<any>) =>
    action$.ofType(AuthActions.GET_USER_INFO)
      .switchMap(({payload}) => {
        return this.af.database.object("/users/" + payload.uid)
          .map((user) => {
            if (user) {
              return {
                type: AuthActions.GET_USER_INFO_SUCCESS,
                payload: Object.assign({}, payload, user)
              }
            } else {
              return Observable.of({
                type: AuthActions.GET_USER_INFO_FAIL,
                payload: {}
              })
            }
          })
      })
  logout = (action$) =>
    action$.ofType(AuthActions.LOGOUT)
      .switchMap(() => {
        this.af.auth.logout();
        this.clearLocalStorage();
        return Observable.of({
          type: AuthActions.LOGOUT_SUCCESS
        });
      });

  isLoggedIn = (action$) =>
    action$.ofType(AuthActions.ISLOGGEDIN)
      .switchMap(() => {
        if (this.getLocalStorage()) {
          console.log('auth exists: ')
          return Observable.of({
            type: AuthActions.GET_USER_INFO,
            payload: this.getLocalStorage()
          });
        } else {
          console.log('auth not exists')
          return Observable.of({
            type: AuthActions.LOGIN_FAIL
          });
        }
      });
  private setLocalStorage(userObj): void {
    localStorage.setItem('campus-recruitment-system', JSON.stringify(userObj));
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('campus-recruitment-system');
  }

  private getLocalStorage() {
    return JSON.parse(localStorage.getItem('campus-recruitment-system'));
  }


}