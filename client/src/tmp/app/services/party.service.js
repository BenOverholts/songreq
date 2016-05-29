"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var core_3 = require('angular2-cookie/core');
require('rxjs/add/operator/map');
var PartyService = (function () {
    function PartyService(_cookieService, http) {
        this._cookieService = _cookieService;
        this.http = http;
        this._apiUrl = 'http://localhost:8080/api/';
        // TODO: Use official Angular2 CORS support when merged 
        // (https://github.com/angular/angular/issues/4231).
        var _build = http._backend._browserXHR.build;
        http._backend._browserXHR.build = function () {
            var _xhr = _build();
            _xhr.withCredentials = true;
            return _xhr;
        };
        // set the user's ID
        this.uid = this._cookieService.get('uid');
        this.offset = parseInt(this._cookieService.get('offset'));
    }
    PartyService.prototype.login = function () {
        window.location.href = 'http://localhost:8080/api/login';
    };
    PartyService.prototype.getStatus = function () {
        return this.http.get(this._apiUrl + 'status')
            .map(function (response) { return response.json(); });
    };
    // create new party and playlist
    PartyService.prototype.create = function () {
        return this.http.get(this._apiUrl + "create?" +
            "uid=" + this.uid);
    };
    PartyService.prototype.getRequests = function () {
        return this.http.get(this._apiUrl + "requests?uid=" + this.uid)
            .map(function (response) { return response.json(); });
    };
    PartyService.prototype.requestSong = function (song) {
        return this.http.get(this._apiUrl + "request?uid=" + this.uid +
            "&uri=" + song.uri +
            "&song_name=" + song.name +
            "&artist=" + song.artist);
    };
    PartyService.prototype.approve = function (song) {
        return this.http.get(this._apiUrl + "approve?uri=" + song.uri);
    };
    PartyService.prototype.dismiss = function (song) {
        return this.http.get(this._apiUrl + "dismiss?uri=" + song.uri);
    };
    PartyService.prototype.getUid = function () {
        return this.uid;
    };
    PartyService.prototype.calcTimeOffset = function () {
        var serverTime = parseInt(this._cookieService.get('server_time'));
        var now = Math.floor(Date.now() / 1000);
        console.log(now);
        serverTime = serverTime ? serverTime : now;
        this._cookieService.put('offset', (now - serverTime) + "");
    };
    // check if spotify session is active (less 5 seconds to be safe)
    PartyService.prototype.checkSession = function () {
        var expiry = parseInt(this._cookieService.get('expiry_time')) - 5;
        var now = Math.floor(Date.now() / 1000);
        return ((this.offset) && (now < expiry + this.offset));
    };
    PartyService = __decorate([
        core_1.Injectable(),
        __param(1, core_2.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [core_3.CookieService, http_1.Http])
    ], PartyService);
    return PartyService;
}());
exports.PartyService = PartyService;

//# sourceMappingURL=party.service.js.map
