import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { PartyService } from './party.service';

@Component({
	selector: 'welcome',
	templateUrl: 'app/templates/welcome.component.html',
	styleUrls: [ 'app/styles/welcome.component.css']
})
export class WelcomeComponent {

	constructor(
		private _router: Router,
		private _partyService: PartyService) {
	}

	gotoLogin() {
        if (this._partyService.checkSession()) {
            console.log('session exists, redirecting to dashboard');
            this._router.navigate(['Dashboard']);
        } else {
            this._partyService.login();
        }
	}	

	gotoParty(){
		this._router.navigate(['Party']);
	}
}                                            