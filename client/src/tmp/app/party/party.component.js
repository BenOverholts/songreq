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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var spotify_service_1 = require('../services/spotify.service');
var party_service_1 = require('../services/party.service');
var PartyComponent = (function () {
    function PartyComponent(_partyService, _spotifyService) {
        this._partyService = _partyService;
        this._spotifyService = _spotifyService;
        this.results = [];
        this.confMessage = "";
    }
    PartyComponent.prototype.search = function () {
        var _this = this;
        this.results = [];
        console.log("Searching for tracks matching: " + this.query);
        this._spotifyService.search(this.query).subscribe(function (res) { return _this.resToSongs(res); });
        this.confMessage = "";
    };
    PartyComponent.prototype.addSuggestion = function (song) {
        var _this = this;
        this._partyService.requestSong(song).subscribe(function (res) {
            console.log("Adding Suggestion: " + song.name);
            _this.results = [];
            _this.confMessage = "Request Submitted";
        });
    };
    PartyComponent.prototype.resToSongs = function (response) {
        //console.log(response['tracks']['items']);
        var tracks = response['tracks']['items'];
        for (var i in tracks) {
            var result = {
                "uri": tracks[i]['uri'],
                "name": tracks[i]['name'],
                "artist": tracks[i]['artists'][0]['name'],
                "artUrl": tracks[i]['album']['images'][0]['url']
            };
            console.log(result);
            this.results.push(result);
        }
        //console.log(this.results);
    };
    PartyComponent = __decorate([
        core_1.Component({
            selector: 'party',
            inputs: ['uid'],
            templateUrl: 'app/party/party.component.html',
            providers: [http_1.HTTP_PROVIDERS, party_service_1.PartyService, spotify_service_1.SpotifyService]
        }), 
        __metadata('design:paramtypes', [party_service_1.PartyService, spotify_service_1.SpotifyService])
    ], PartyComponent);
    return PartyComponent;
}());
exports.PartyComponent = PartyComponent;

//# sourceMappingURL=party.component.js.map
