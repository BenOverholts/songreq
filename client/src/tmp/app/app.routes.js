"use strict";
var dashboard_component_1 = require('./dashboard/dashboard.component');
var party_component_1 = require('./party/party.component');
var login_component_1 = require('./login/login.component');
var welcome_component_1 = require('./welcome/welcome.component');
exports.APP_ROUTES = [
    { path: '/', name: 'Welcome', component: welcome_component_1.WelcomeComponent },
    { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
    { path: '/dashboard', name: 'Dashboard', component: dashboard_component_1.DashboardComponent },
    { path: '/party/:uid', name: 'Party', component: party_component_1.PartyComponent }
];

//# sourceMappingURL=app.routes.js.map
