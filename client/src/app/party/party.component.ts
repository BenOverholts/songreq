import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { PartyService } from '../services/party.service';
import { Song } from '../song';

@Component({
    selector: 'party',
    inputs: ['uid'],
    templateUrl: 'app/party/party.component.html',
    providers: [ HTTP_PROVIDERS, PartyService, SpotifyService ],
    directives: [ROUTER_DIRECTIVES]
})
export class PartyComponent {
    results: Song[] = [];
    query: string;
    confMessage: string;
    helpMessage: string;
    partySelected: boolean = false;
    partySearchId: string;

    constructor(
        private _partyService: PartyService,
        private _spotifyService: SpotifyService,
        private _router: Router) {

        this.confMessage = "";
        this.helpMessage = "";
        this.partySelected = true;
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
            this.query = "";
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

    attemptJoin() {
      var navUrl = '/party/' + this.partySearchId;
      this._router.navigate([navUrl]);
      return false; // https://github.com/angular/angular/issues/6154
    }

    routerOnActivate(curr: RouteSegment) {
      if (curr.getParam('pid')) {
        this._partyService.setPid(curr.getParam('pid'));
        this._partyService.partyExists().subscribe( res =>
          { if (res.party) {
              this.partySelected = true;
              this.helpMessage = "";
            } else {
              this.partySelected = false;
              this.helpMessage = "Oops, we couldn't find party "
                + this._partyService.getPid()
                + "! Make sure you got the right link from the host, "
                + "or you entered the right party ID.";
            }
        });
      } else {
        this.partySelected = false;
        this.helpMessage = "";
      }
    }
}
