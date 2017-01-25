import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';

import { combineReducers } from 'redux';

// Reducers
import { authReducer, companyReducer, studentReducer } from './reducers';
// Actions
import { AuthActions, CompanyAction, StudentAction } from './actions';
export { AuthActions, CompanyAction, StudentAction } from './actions';

import { HttpService } from '../providers';

import { AuthEpics, CompanyEpics, StudentEpics } from './epics';

export { Observable } from 'rxjs';
export { select, NgRedux } from 'ng2-redux';
export { bindActionCreators } from 'redux';

export interface IAppState {
  auth?: Object;
  company?: Object;
  student?: Object;
}

export const AppReducer = combineReducers<IAppState>({
  auth: authReducer,
  company: companyReducer,
  student: studentReducer
});


@NgModule({
  providers: [
    // actions
    AuthActions,
    CompanyAction,
    StudentAction
    // epics
    , AuthEpics
    , CompanyEpics
    , StudentEpics
    // other services
    , HttpService
  ]
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ae: AuthEpics,
    private ce: CompanyEpics,
    private se: StudentEpics
  ) {
    const middleware = [
      createEpicMiddleware(this.ae.register),
      createEpicMiddleware(this.ae.login),
      createEpicMiddleware(this.ce.getCompanies),
      createEpicMiddleware(this.se.getStudents),
      createEpicMiddleware(this.ae.isLoggedIn),
      createEpicMiddleware(this.ae.getUserInfo)
    ];
    this.ngRedux.configureStore(
      AppReducer,                                         // Main Reducer
      {},                                                 // Defailt State
      middleware,                                         // Middlewares
      [devTool.isEnabled() ? devTool.enhancer() : f => f] // Enhancers
    )
  }
} 