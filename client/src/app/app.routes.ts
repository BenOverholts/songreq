import { DashboardComponent } from './dashboard/dashboard.component';
import { PartyComponent } from './party/party.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

export var APP_ROUTES: any[] = [
    { path: '/', name: 'Welcome', component: WelcomeComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent },
    { path: '/party/:pid', name: 'Party', component: PartyComponent },
    { path: '/party', name: 'Party', component: PartyComponent }
];
