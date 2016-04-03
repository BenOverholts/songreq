import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { SpotifyService } from './spotify.service';

@Component({
    selector: 'login',
    templateUrl: 'app/templates/login.component.html',
    styleUrls: ['app/styles/login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private _routeParams: RouteParams,
        private _router: Router,
        private _spotifyService: SpotifyService) { 
    }

    ngOnInit() {
        console.log(this._routeParams);
        this._spotifyService.setCredentials(
            this._routeParams.get('access_token'),
            this._routeParams.get('refresh_token'),
            this._routeParams.get('uid')
        );
        if (this._routeParams.get('session') == "false") {
            this._spotifyService.create();
        }
        this._router.navigate(['Dashboard']);
    }
}