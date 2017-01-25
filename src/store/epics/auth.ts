import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthActions } from '../actions';


@Injectable()
export class AuthEpics {
  constructor( private af: AngularFire) { }

  register = (action$) =>
    action$.ofType(AuthActions.SIGN_UP)
      .switchMap(({payload}): any => {
        return this.af.auth.createUser({ email: payload.email, password: payload.password }).then((response) => {
          
          let users = payload.type === 2 ? this.af.database.object(`companies/${response.uid}`):  this.af.database.object(`users/${response.uid}`);
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
              type: AuthActions.LOGIN_SUCCESS,
              payload: auth
            };
          }, (err) => {
            return {
              type: AuthActions.LOGIN_FAIL,
              payload: {}
            };
          })
      );

  // logout = (action$) =>
  //   action$.ofType(AuthActions.LOGOUT)
  //     .switchMap(() => {
  //       this.af.auth.logout();
  //       this.clearLocalStorage();
  //       return Observable.of({
  //         type: AuthActions.LOGOUT_SUCCESS
  //       });
  //     });

  isLoggedIn = (action$) =>
    action$.ofType(AuthActions.ISLOGGEDIN)
      .switchMap(() => {
        if (this.getLocalStorage()) {
          // console.log('auth exists: ', this.getLocalStorage())
          console.log('auth exists: ')
          return Observable.of({
            type: AuthActions.LOGIN_SUCCESS,
            payload: this.getLocalStorage()
          });
        } else {
          console.log('auth not exists')
          return Observable.of({
            type: AuthActions.LOGIN_FAIL
          });
        }
      });

  // getCurrentUserData = (action$) =>
  //   action$.ofType(AuthActions.LOGIN_SUCCESS)
  //     .switchMap(({payload}) => this.af.database.object(`users/${payload.userID}`)
  //       .catch(err => {
  //         console.log('users/ err ', err);
  //         return Observable.of(null)
  //       })
  //       .switchMap((user) => {
  //         if (user) {
  //           // console.log("Login", user);     
  //           return Observable.of({
  //             type: AuthActions.SETCURRENTUSERDATA,
  //             payload: user
  //           });
  //         } else {
  //           return Observable.of({
  //             type: AuthActions.NULL
  //           });
  //         }
  //       }));

  // UseCheckedIn = (action$) =>
  //   action$.ofType(AuthActions.LOGIN_SUCCESS)
  //     .switchMap(({payload}) => {
  //       return this.af.database.object(`subgroup-check-in-current-by-user/${payload.userID}`)
  //         .catch(err => {
  //           return Observable.of(null)
  //         })
  //         .map((checkedInObject) => {
  //           if (checkedInObject && checkedInObject.type == 1) {
  //             return {
  //               type: AuthActions.USERCHECKEDIN_SUCCESS,
  //               payload: checkedInObject
  //             };
  //           } else {
  //             return {
  //               type: AuthActions.USERCHECKEDIN_FAIL
  //             };
  //           }
  //         })
  //     }); firebase

  // UserOnline = (action$) =>
  //   action$.ofType(AuthActions.LOGIN_SUCCESS)
  //     .switchMap(() => this.af.database.object('.info/connected')
  //       .catch(err => {
  //         return Observable.of(null)
  //       })
  //       .switchMap((snapshot) => {
  //         let pushKey = null;
  //         if (snapshot && snapshot['$value'] == true && snapshot['$key'] == 'connected') {
  //           let userID = this.getLocalStorage().userID;
  //           // is online
  //           this.af.database.list('users-presence/' + this.getLocalStorage().userID + '/connections').push({})
  //             .then((item) => {
  //               pushKey = item.key;
  //               // console.log('key: ', pushKey);

  //               // update/add user-presence object
  //               let multipath = {}
  //               multipath[userID + "/last-modified"] = firebase.database['ServerValue'].TIMESTAMP;
  //               multipath[userID + "/defined-status"] = 1;
  //               multipath[userID + "/connections/" + item.key + "/type"] = 1;
  //               multipath[userID + "/connections/" + item.key + "/started"] = firebase.database['ServerValue'].TIMESTAMP;
  //               multipath[userID + "/connections/" + item.key + "/machineTitle"] = 'web';

  //               firebase.database().ref('/').child('users-presence').update(multipath);

  //               firebase.database().ref('/').child('users-presence/' + userID).onDisconnect().update({
  //                 'last-modified': firebase.database['ServerValue'].TIMESTAMP,
  //                 'defined-status': 0
  //               });

  //               firebase.database().ref('/').child('users-presence/' + userID + '/connections/' + item.key).onDisconnect().remove();

  //             }); // persence.push

  //           return Observable.of({
  //             type: AuthActions.USERONLINE_SUCCESS
  //           });
  //         } else {
  //           return Observable.of({
  //             type: AuthActions.USERONLINE_FAIL
  //           });
  //         }
  //       }));

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