import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Router, RouteParams } from 'angular2/router';
import { SpotifyService } from './spotify.service';
import { PartyService } from './party.service';
import { Song } from './song';
import { SONGS } from './mock-songs';

@Component({
    selector: 'party',
    inputs: ['uid'],
    templateUrl: 'app/templates/party.component.html',
    styleUrls: [ 'app/styles/party.component.css' ],
    providers: [ HTTP_PROVIDERS ]
})
export class PartyComponent {
    results: Song[] = [];
    query: string;
    confMessage: string;

    constructor(
        private _routeParams: RouteParams,
        private _partyService: PartyService,
        private _spotifyService: SpotifyService) {

        this.confMessage = ""
    }

    search() {
        this.results = [];
        console.log("Searching for tracks matching: " + this.query);
        this._spotifyService.search(this.query).subscribe(
            res => this.resToSongs(res));
        this.confMessage = "";
    }

    addSuggestion(song: Song){
        this._partyService.requestSong(song);
        console.log("Adding Suggestion: " + song.name);
        this.results = [];
        this.confMessage = "Request Submitted";
    }

    resToSongs(response) {
        //console.log(response['tracks']['items']);
        var tracks = response['tracks']['items'];
        for (var i in tracks) {
            var result: Song = {
                "uri": tracks[i]['uri'],
                "name": tracks[i]['name'],
                "artist": tracks[i]['artists'][0]['name'],
                "artUrl": tracks[i]['album']['images'][0]['url']
            };
            console.log(result);
            this.results.push(result);
        }
        //console.log(this.results);
    }
}