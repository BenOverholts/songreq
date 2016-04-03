System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var SpotifyService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            SpotifyService = (function () {
                function SpotifyService(http) {
                    this.http = http;
                    this._spotifyUrl = 'https://api.spotify.com/v1/';
                }
                // set user credentials (for DJ)
                SpotifyService.prototype.setCredentials = function (auth_token, refresh_token, uid) {
                    if (!this.credentialsSet()) {
                        this.auth_token = auth_token;
                        this.refresh_token = refresh_token;
                        this.uid = uid;
                    }
                };
                SpotifyService.prototype.credentialsSet = function () {
                    return (this.auth_token && this.refresh_token && this.uid);
                };
                SpotifyService.prototype.getUid = function () {
                    return this.uid;
                };
                // create new party and playlist
                SpotifyService.prototype.create = function () {
                    this.http.get("/api/create?" +
                        "uid=" + this.uid +
                        "&access_token=" + this.auth_token)
                        .map(function (response) { return response.json(); }).subscribe(function (res) { return console.log(res); });
                    //console.log("Create API Called");
                };
                SpotifyService.prototype.getRequests = function () {
                    return this.http.get("/api/requests?uid=" + this.uid)
                        .map(function (response) { return response.json(); });
                };
                SpotifyService.prototype.requestSong = function (song) {
                    this.http.get("/api/request?uid=" + this.uid +
                        "&uri=" + song.uri +
                        "&song_name=" + song.name +
                        "&artist=" + song.artist)
                        .map(function (response) { return response.json(); }).subscribe(function (res) { return console.log(res); });
                };
                SpotifyService.prototype.approve = function (song) {
                    this.http.get("/api/approve?uri=" + song.uri +
                        "&uid=" + this.uid +
                        "&access_token=" + this.auth_token)
                        .map(function (response) { return response.json(); }).subscribe(function (res) { return console.log(res); });
                };
                SpotifyService.prototype.dismiss = function (song) {
                    this.http.get("/api/dismiss?uri=" + song.uri +
                        "&uid=" + this.uid +
                        "&access_token=" + this.auth_token)
                        .map(function (response) { return response.json(); }).subscribe(function (res) { return console.log(res); });
                };
                // search songs that match query string
                SpotifyService.prototype.search = function (query) {
                    return this.http.get(this._spotifyUrl + 'search?q='
                        + query.replace(' ', '%20') + '&limit=10&type=track')
                        .map(function (response) { return response.json(); });
                };
                SpotifyService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SpotifyService);
                return SpotifyService;
            }());
            exports_1("SpotifyService", SpotifyService);
        }
    }
});
//# sourceMappingURL=spotify.service.js.map