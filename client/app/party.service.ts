import { Injectable } from 'angular2/core';
import { Inject } from 'angular2/core';
import { Http, Response, BrowserXhr } from 'angular2/http';
import { Song } from './song';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PartyService {
    uid: string;
    offset: number; // client/server time offset

    private _apiUrl = 'http://localhost:8080/api/';

    constructor(
        private _cookieService: CookieService,
        private http: Http) {

        // set the user's ID
        this.uid = this._cookieService.get('uid');
        this.offset = parseInt(this._cookieService.get('offset'));
    }

    login() {
        window.location.href = 'http://localhost:8080/api/login';
    }

    // create new party and playlist
    create() {
        this.http.get(this._apiUrl + "create?" +
            "uid=" + this.uid)
            .map(response => response.json()).subscribe(
            res => console.log(res));
    }

    getRequests() {
        return this.http.get(this._apiUrl + "requests?uid=" + this.uid)
            .map(response => response.json());
    }

    requestSong(song: Song) {
        this.http.get(this._apiUrl + "request?uid=" + this.uid +
            "&uri=" + song.uri +
            "&song_name=" + song.name +
            "&artist=" + song.artist)
            .map(response => response.json()).subscribe(
            res => console.log(res));

    }

    approve(song: Song) {
        this.http.get(this._apiUrl + "approve?uri=" + song.uri +
            "&uid=" + this.uid)
            .map(response => response.json()).subscribe(
            res => console.log(res));
    }

    dismiss(song: Song) {
        this.http.get(this._apiUrl + "dismiss?uri=" + song.uri +
            "&uid=" + this.uid)
            .map(response => response.json()).subscribe(
            res => console.log(res));
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
        console.log(this.offset);
        console.log((now < expiry + this.offset));
        return ((this.offset) && (now < expiry + this.offset));
    }
}