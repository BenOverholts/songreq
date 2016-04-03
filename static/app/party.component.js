System.register(['angular2/core', 'angular2/http', 'angular2/router', './spotify.service'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, spotify_service_1;
    var PartyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            }],
        execute: function() {
            PartyComponent = (function () {
                function PartyComponent(_routeParams, _spotifyService) {
                    this._routeParams = _routeParams;
                    this._spotifyService = _spotifyService;
                    this.results = [];
                    this._spotifyService.setCredentials("", "", this._routeParams.get('uid'));
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
                    this._spotifyService.requestSong(song);
                    console.log("Adding Suggestion: " + song.name);
                    this.results = [];
                    this.confMessage = "Request Submitted";
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
                        templateUrl: 'app/templates/party.component.html',
                        styleUrls: ['app/styles/party.component.css'],
                        providers: [http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, spotify_service_1.SpotifyService])
                ], PartyComponent);
                return PartyComponent;
            }());
            exports_1("PartyComponent", PartyComponent);
        }
    }
});
//# sourceMappingURL=party.component.js.map