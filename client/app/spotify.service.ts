import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Song } from './song';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

    constructor (private http: Http) { }

    private _spotifyUrl = 'https://api.spotify.com/v1/';

    // search songs that match query string
    search(query: string) {
        return this.http.get(this._spotifyUrl + 'search?q='
            + query.replace(' ', '%20') + '&limit=10&type=track')
            .map(response => response.json());
    }
}