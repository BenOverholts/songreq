"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var core_2 = require('angular2-cookie/core');
var app_component_1 = require('./app.component');
if (ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS, core_2.CookieService, router_1.ROUTER_PROVIDERS
]);

//# sourceMappingURL=main.js.map
