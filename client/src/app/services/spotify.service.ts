import { Injectable, Inject, provide } from '@angular/core';
import { Http, Response, BrowserXhr } from '@angular/http';
import { Song } from '../song';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    _http: Http;

    constructor(@Inject(Http) private http: Http) {
        // TODO: Use official Angular2 CORS support when merged
        // (https://github.com/angular/angular/issues/4231).
        let _build = (<any>http)._backend._browserXHR.build;
        (<any>http)._backend._browserXHR.build = () => {
            let _xhr = _build();
            _xhr.withCredentials = false;
            return _xhr;
        };
    }

    private _spotifyUrl = 'https://api.spotify.com/v1/';

    // search songs that match query string
    search(query: string) {
        return this.http.get(this._spotifyUrl + 'search?q='
            + query.replace(' ', '%20') + '&limit=10&type=track')
            .map(response => response.json());
    }
}
