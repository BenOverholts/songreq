import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Http, Response, BrowserXhr } from '@angular/http';
import { Song } from '../song';
import { ENVIRONMENT } from '../env';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PartyService {
    uid: string;
    offset: number; // client/server time offset

    private _apiUrl = ENVIRONMENT.apiUrl;

    constructor(
        private _cookieService: CookieService,
        @Inject(Http) private http: Http) {
        // TODO: Use official Angular2 CORS support when merged
        // (https://github.com/angular/angular/issues/4231).
        let _build = (<any>http)._backend._browserXHR.build;
        (<any>http)._backend._browserXHR.build = () => {
            let _xhr = _build();
            _xhr.withCredentials = true;
            return _xhr;
        };

        // set the user's ID
        this.uid = this._cookieService.get('uid');
        this.offset = parseInt(this._cookieService.get('offset'));
    }

    login() {
        window.location.href = this._apiUrl + 'login';
    }

    getStatus() {
        return this.http.get(this._apiUrl + 'status')
            .map(response => response.json());
    }

    // create new party and playlist
    create() {
        return this.http.get(this._apiUrl + "create?" +
            "uid=" + this.uid);
    }

    getRequests() {
        return this.http.get(this._apiUrl + "requests?uid=" + this.uid)
            .map(response => response.json());
    }

    requestSong(song: Song) {
        return this.http.get(this._apiUrl + "request?uid=" + this.uid +
            "&uri=" + song.uri +
            "&song_name=" + song.name +
            "&artist=" + song.artist);

    }

    approve(song: Song) {
        return this.http.get(this._apiUrl + "approve?uri=" + song.uri);
    }

    dismiss(song: Song) {
        return this.http.get(this._apiUrl + "dismiss?uri=" + song.uri);
    }

    getUid() {
        return this.uid;
    }

    calcTimeOffset() {
        var serverTime = parseInt(this._cookieService.get('server_time'));
        var now = Math.floor(Date.now() / 1000);
        console.log(now);
        serverTime = serverTime ? serverTime : now;
        this._cookieService.put('offset', (now - serverTime)+"");
    }

    // check if spotify session is active (less 5 seconds to be safe)
    checkSession() {
        var expiry = parseInt(this._cookieService.get('expiry_time')) - 5;
        var now = Math.floor(Date.now() / 1000);
        return ((this.offset) && (now < expiry + this.offset));
    }
}
