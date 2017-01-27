"use strict";
var containers_1 = require('../containers');
var components_1 = require("../components");
// import AuthGuard service which will help to prevent users from entering homepage without authentication
var index_1 = require('../providers/index');
exports.AppRoutes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: "signin", component: containers_1.SigninContainer },
    { path: "signup", component: containers_1.SignupContainer },
    {
        path: "",
        component: containers_1.RootContainer,
        canActivate: [index_1.AuthGuardService],
        children: [
            { path: "dashboard", component: containers_1.DashboardContainer },
            { path: "addcompany", component: containers_1.AddCompanyContainer },
            { path: "profile", component: containers_1.ProfileContainer },
            { path: "post/details", component: containers_1.DetailsContainer },
        ]
    }
];
exports.ApplicationComponents = [
    containers_1.Containers,
    components_1.Components
];
