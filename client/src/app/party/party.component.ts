import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { PartyService } from '../services/party.service';
import { Song } from '../song';

@Component({
    selector: 'party',
    inputs: ['uid'],
    templateUrl: 'app/party/party.component.html',
    providers: [ HTTP_PROVIDERS, PartyService, SpotifyService ]
})
export class PartyComponent {
    results: Song[] = [];
    query: string;
    confMessage: string;

    constructor(
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
        this._partyService.requestSong(song).subscribe(res => {
            console.log("Adding Suggestion: " + song.name);
            this.results = [];
            this.confMessage = "Request Submitted";
        });
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