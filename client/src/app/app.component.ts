import {Component} from '@angular/core';
import {Router, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartyComponent } from './party/party.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PartyService } from './services/party.service';
import { SpotifyService } from './services/spotify.service';

@Component({
    selector: 'songreq',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, PartyService, SpotifyService]
})
@Routes(APP_ROUTES)
export class AppComponent {
    title = 'Songreq';

    constructor(private _router: Router) {

    }

}
