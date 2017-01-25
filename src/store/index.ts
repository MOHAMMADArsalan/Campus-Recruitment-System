import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';

import { combineReducers } from 'redux';

// Reducers
import { authReducer } from './reducers';

// Actions
import { AuthActions } from './actions';
export { AuthActions } from './actions';

import { HttpService } from '../providers';

import { AuthEpics } from './epics';

export { Observable } from 'rxjs';
export { select, NgRedux } from 'ng2-redux';
export { bindActionCreators } from 'redux';

export interface IAppState {
  auth?: Object;
}

export const AppReducer = combineReducers<IAppState>({
  auth: authReducer
});


@NgModule({
  providers: [
    // actions
    AuthActions,
    // epics
    , AuthEpics
    // other services
    , HttpService
  ]
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ae: AuthEpics,
  ) {
    const middleware = [
      createEpicMiddleware(this.ae.register)
      // createEpicMiddleware(this.ae.register),
    ];
    this.ngRedux.configureStore(
      AppReducer,                                         // Main Reducer
      {},                                                 // Defailt State
      middleware,                                         // Middlewares
      [devTool.isEnabled() ? devTool.enhancer() : f => f] // Enhancers
    )
  }
} 