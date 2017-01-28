import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';

import { combineReducers } from 'redux';

// Reducers
import { authReducer, parkingReducer, userReducer } from './reducers';
// Actions
import { AuthActions, ParkingAction, UserAction } from './actions';
export { AuthActions, ParkingAction, UserAction } from './actions';

import { HttpService } from '../providers';

import { AuthEpics, ParkingEpics, UserEpics } from './epics';

export { Observable } from 'rxjs';
export { select, NgRedux } from 'ng2-redux';
export { bindActionCreators } from 'redux';

export interface IAppState {
  auth?: Object;
  parking?: Object;
  feedback?: Object;
}

export const AppReducer = combineReducers<IAppState>({
  auth: authReducer,
  parking: parkingReducer,
  feedback: userReducer
});


@NgModule({
  providers: [
    // actions
    AuthActions,
    ParkingAction,
    UserAction
    // epics
    , AuthEpics
    , ParkingEpics
    , UserEpics
    // other services
    , HttpService
  ]
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ae: AuthEpics,
    private pe: ParkingEpics,
    private ue: UserEpics
  ) {
    const middleware = [
      createEpicMiddleware(this.ae.register),
      createEpicMiddleware(this.ae.login),
      createEpicMiddleware(this.pe.getParkingLocation),
      createEpicMiddleware(this.ue.getFeedbacks),
      createEpicMiddleware(this.ae.isLoggedIn),
      createEpicMiddleware(this.ae.getUserInfo),
      createEpicMiddleware(this.ae.logout),
      createEpicMiddleware(this.pe.getParkingDetailByUser),
      createEpicMiddleware(this.pe.getOneParkingData),
      createEpicMiddleware(this.pe.getParkingAvailablity)
    ];
    this.ngRedux.configureStore(
      AppReducer,                                         // Main Reducer
      {},                                                 // Defailt State
      middleware,                                         // Middlewares
      [devTool.isEnabled() ? devTool.enhancer() : f => f] // Enhancers
    )
  }
} 