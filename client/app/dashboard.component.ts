import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { PartyService } from './party.service';
import { Song } from './song';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/templates/dashboard.component.html',
    styleUrls: [ 'app/styles/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
    requests: Song[];
    shareUrl: string;

    constructor(private _partyService: PartyService) { }

    refreshRequests() {
        this._partyService.getRequests().subscribe(reqs => this.requests = reqs);
    }

    approveSong(song: Song) {
        this._partyService.approve(song).subscribe(res => this.refreshRequests());
    }

    dismissSong(song: Song) {
        this._partyService.dismiss(song).subscribe(res => this.refreshRequests());
    }

    ngOnInit() {
        // Check party status
        this._partyService.getStatus().subscribe(res => {
            if (!res.party) {
                this._partyService.create().subscribe();
                // TODO .subscribe( {showSpinner = true} );
            }
            // TODO Pop some toast like "Loaded existing party"
        });

        this.shareUrl = window.location.host + "/party/" + this._partyService.getUid();
    }
}