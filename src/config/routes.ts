import { Routes } from '@angular/router';

import {
  Containers,
  HomeContainer,
  SigninContainer,
  SignupContainer,
  RootContainer,
  DashboardContainer,
  AddCompanyContainer,
  ProfileContainer,
  DetailsContainer

} from '../containers';
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
      { path: "dashboard", component: DashboardContainer },
      { path: "addcompany", component: AddCompanyContainer },
      { path: "profile", component: ProfileContainer },
      { path: "post/details", component: DetailsContainer },

    ]
  }
];

export const ApplicationComponents: any[] = [
  Containers
  , Components
];