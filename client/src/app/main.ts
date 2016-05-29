import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from './app.component';

declare var ENV: string;

if (ENV === 'production') {
    enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS, CookieService, ROUTER_PROVIDERS
]);
