"use strict";
var home_1 = require('./home/home');
exports.HomeContainer = home_1.HomeContainer;
var signin_1 = require('./signin/signin');
exports.SigninContainer = signin_1.SigninContainer;
var signup_1 = require('./signup/signup');
exports.SignupContainer = signup_1.SignupContainer;
var root_1 = require('./root/root');
exports.RootContainer = root_1.RootContainer;
var dashboard_1 = require("./dashboard/dashboard");
exports.DashboardContainer = dashboard_1.DashboardContainer;
var addcompany_1 = require("./addcompany/addcompany");
exports.AddCompanyContainer = addcompany_1.AddCompanyContainer;
var profile_1 = require("./profile/profile");
exports.ProfileContainer = profile_1.ProfileContainer;
var details_1 = require("./details/details");
exports.DetailsContainer = details_1.DetailsContainer;
exports.Containers = [
    home_1.HomeContainer,
    signin_1.SigninContainer,
    signup_1.SignupContainer,
    root_1.RootContainer,
    dashboard_1.DashboardContainer,
    addcompany_1.AddCompanyContainer,
    profile_1.ProfileContainer,
    details_1.DetailsContainer
];
