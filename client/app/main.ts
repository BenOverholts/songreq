import {bootstrap}    from 'angular2/platform/browser'
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {BrowserXhr} from 'angular2/http';
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from './app.component';

// Allow cookies to be sent with http requests
// TODO Refactor to somewhere else
@Injectable()
export class CredentialsBrowserXhr extends BrowserXhr {
    constructor() { super(); }
    build(): any {
        let xhr = super.build();
        xhr.withCredentials = true;
        return <any>(xhr);
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS, CookieService, 
    provide(BrowserXhr, { useClass: CredentialsBrowserXhr })]);