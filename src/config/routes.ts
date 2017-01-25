import { Routes } from '@angular/router';

import { Containers, HomeContainer, SigninContainer, SignupContainer, RootContainer } from '../containers';
import { Components } from "../components";

// import AuthGuard service which will help to prevent users from entering homepage without authentication
import { AuthGuardService } from '../providers/index';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  , { path: "home", component: HomeContainer }
  , { path: "signin", component: SigninContainer }
  , { path: "signup", component: SignupContainer }
  , {
    path: "",
    component: RootContainer,
    canActivate: [AuthGuardService],
    children: [
      { path: "user/:id", component: HomeContainer },
    ]
  }
];

export const ApplicationComponents: any[] = [
  Containers
  , Components
];