import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { SpotifyService } from './spotify.service';
import { Song } from './song';
import { SONGS } from './mock-songs';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/templates/dashboard.component.html',
    styleUrls: [ 'app/styles/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
    requests: Song[];//Observable<Song[]>;
    shareUrl: string;

    constructor(private _spotifyService: SpotifyService) { }

    refreshRequests() {
        this._spotifyService.getRequests().subscribe(reqs => this.requests = reqs);
        console.log(this.requests);
    }

    approveSong(song: Song) {
        this._spotifyService.approve(song);
        console.log("song added");
        this.refreshRequests();
    }

    dismissSong(song: Song) {
        // remove song from requests array
        this._spotifyService.dismiss(song);
        console.log("song rejected");
        this.refreshRequests();
    }

    ngOnInit() {
        if (!this._spotifyService.credentialsSet()) {
            window.location.href = '/api/login';
        } else {
            this.shareUrl = window.location.host + "/party/" + this._spotifyService.getUid();
        }
    }
}