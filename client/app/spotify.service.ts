import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Song } from './song';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    auth_token: string;
    refresh_token: string;
    uid: string;

    constructor (private http: Http) { }

    private _spotifyUrl = 'https://api.spotify.com/v1/';

    // set user credentials (for DJ)
    setCredentials(auth_token: string, refresh_token: string,
            uid: string) {
        if (!this.credentialsSet()) {
            this.auth_token = auth_token;
            this.refresh_token = refresh_token;
            this.uid = uid;
        }
    }

    credentialsSet() {
        return (this.auth_token && this.refresh_token && this.uid);
    }

    getUid() {
        return this.uid;
    }

    // create new party and playlist
    create() {
        this.http.get("/api/create?" +
            "uid=" + this.uid +
            "&access_token=" + this.auth_token)
            .map(response => response.json()).subscribe(
                res => console.log(res));
        //console.log("Create API Called");
    }

    getRequests() {
        return this.http.get("/api/requests?uid=" + this.uid)
            .map(response => response.json());
    }

    requestSong(song: Song) {
        this.http.get("/api/request?uid=" + this.uid +
            "&uri=" + song.uri +
            "&song_name=" + song.name +
            "&artist=" + song.artist)
            .map(response => response.json()).subscribe(
            res => console.log(res));

    }

    approve(song: Song) {
        this.http.get("/api/approve?uri=" + song.uri +
            "&uid=" + this.uid + 
            "&access_token=" + this.auth_token)
            .map(response => response.json()).subscribe(
            res => console.log(res));
    }

    dismiss(song: Song) {
        this.http.get("/api/dismiss?uri=" + song.uri +
            "&uid=" + this.uid +
            "&access_token=" + this.auth_token)
            .map(response => response.json()).subscribe(
            res => console.log(res));
    }

    // search songs that match query string
    search(query: string) {
        return this.http.get(this._spotifyUrl + 'search?q='
            + query.replace(' ', '%20') + '&limit=10&type=track')
            .map(response => response.json());
    }
}