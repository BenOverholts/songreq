System.register(['angular2/core', './spotify.service'], function(exports_1, context_1) {
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
    var core_1, spotify_service_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(_spotifyService) {
                    this._spotifyService = _spotifyService;
                }
                DashboardComponent.prototype.refreshRequests = function () {
                    var _this = this;
                    this._spotifyService.getRequests().subscribe(function (reqs) { return _this.requests = reqs; });
                    console.log(this.requests);
                };
                DashboardComponent.prototype.approveSong = function (song) {
                    this._spotifyService.approve(song);
                    console.log("song added");
                    this.refreshRequests();
                };
                DashboardComponent.prototype.dismissSong = function (song) {
                    // remove song from requests array
                    this._spotifyService.dismiss(song);
                    console.log("song rejected");
                    this.refreshRequests();
                };
                DashboardComponent.prototype.ngOnInit = function () {
                    if (!this._spotifyService.credentialsSet()) {
                        window.location.href = '/api/login';
                    }
                    else {
                        this.shareUrl = window.location.host + "/party/" + this._spotifyService.getUid();
                    }
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard',
                        templateUrl: 'app/templates/dashboard.component.html',
                        styleUrls: ['app/styles/dashboard.component.css']
                    }), 
                    __metadata('design:paramtypes', [spotify_service_1.SpotifyService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map