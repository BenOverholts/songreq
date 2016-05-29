import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from '../services/party.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
})
export class LoginComponent implements OnInit {

    constructor(
        private _router: Router,
        private _partyService: PartyService) {
    }

    ngOnInit() {
        this._partyService.calcTimeOffset();
        if (!this._partyService.checkSession()) {
            this._partyService.create().subscribe(
                res => this._router.navigate(['/dashboard']));
        }
        this._router.navigate(['/dashboard']);
    }
}
