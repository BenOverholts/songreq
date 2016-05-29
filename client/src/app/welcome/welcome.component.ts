import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from '../services/party.service';

@Component({
	selector: 'welcome',
	templateUrl: 'app/welcome/welcome.component.html',
})
export class WelcomeComponent {

    constructor(
        private _router: Router,
        private _partyService: PartyService) {
    }

	gotoLogin() {
        if (this._partyService.checkSession()) {
            console.log('session exists, redirecting to dashboard');
            this._router.navigate(['/dashboard']);
        } else {
            this._partyService.login();
        }
	}	

	gotoParty(){
		this._router.navigate(['/party']);
	}
}                                            