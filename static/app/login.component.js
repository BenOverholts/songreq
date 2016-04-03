System.register(['angular2/core', 'angular2/router', './spotify.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, spotify_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_routeParams, _router, _spotifyService) {
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._spotifyService = _spotifyService;
                }
                LoginComponent.prototype.ngOnInit = function () {
                    console.log(this._routeParams);
                    this._spotifyService.setCredentials(this._routeParams.get('access_token'), this._routeParams.get('refresh_token'), this._routeParams.get('uid'));
                    if (this._routeParams.get('session') == "false") {
                        this._spotifyService.create();
                    }
                    this._router.navigate(['Dashboard']);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/templates/login.component.html',
                        styleUrls: ['app/styles/login.component.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, router_1.Router, spotify_service_1.SpotifyService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map