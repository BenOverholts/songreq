import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { DashboardComponent } from './dashboard.component';
import { PartyComponent } from './party.component';
import { LoginComponent } from './login.component';
import { WelcomeComponent } from './welcome.component';
import { SpotifyService } from './spotify.service';

@Component({
    selector: 'songreq',
    templateUrl: 'app/templates/app.component.html',
    styleUrls: [ 'app/styles/app.component.css' ],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, SpotifyService]
})
@RouteConfig([
{
    path: '/login',
    name: 'Login',
    component: LoginComponent
},
{
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
},
{
    path: '/party/:uid',
    name: 'Party',
    component: PartyComponent
},
{
    path: '/welcome',
    name: 'Welcome',
    component: WelcomeComponent,
    useAsDefault: true
}])
export class AppComponent {
    title = 'Songreq';
}