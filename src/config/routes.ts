import { Routes } from '@angular/router';

import {
  Containers,
  HomeContainer,
  SigninContainer,
  SignupContainer,
  RootContainer,
  DashboardContainer,
  AddParkingContainer,
  ProfileContainer,
  DetailsContainer,
  AddSlotContainer,
  ViewFeedBackContainer

} from '../containers';
import { Components } from "../components";

// import AuthGuard service which will help to prevent users from entering homepage without authentication
import { AuthGuardService } from '../providers/index';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
  // , { path: "home", component: HomeContainer }
  , { path: "signin", component: SigninContainer }
  , { path: "signup", component: SignupContainer }
  , {
    path: "",
    component: RootContainer,
    canActivate: [AuthGuardService],
    children: [
      { path: "dashboard", component: DashboardContainer },
      { path: "addparking", component: AddParkingContainer },
      { path: "profile", component: ProfileContainer },
      { path: "parking/details", component: DetailsContainer },
      { path: "addslot", component: AddSlotContainer },
      { path: "viewfeedback", component: ViewFeedBackContainer }
    ]
  }
];

export const ApplicationComponents: any[] = [
  Containers
  , Components
];