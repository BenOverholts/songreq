import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { PartyService } from './party.service';

@Component({
    selector: 'login',
    templateUrl: 'app/templates/login.component.html',
    styleUrls: ['app/styles/login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private _router: Router,
        private _partyService: PartyService) { 
    }

    ngOnInit() {
        this._partyService.calcTimeOffset();
        if (!this._partyService.checkSession()) {
            this._partyService.create();
        }
        this._router.navigate(['Dashboard']);
    }
}