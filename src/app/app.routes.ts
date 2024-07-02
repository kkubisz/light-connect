import { Routes } from '@angular/router';
import { ManageClientComponent } from './clients/manage-client/manage-client.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SingleClientComponent } from './clients/single-client/single-client.component';
import { MapsComponent } from './maps/maps/maps.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './authentication/auth/auth.guard.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'map',
    component: MapsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'clients',
    title: 'Clients',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'add',
        component: ManageClientComponent,
      },
      {
        path: ':clientId',
        title: 'Client',
        component: SingleClientComponent,
      },
      {
        path: 'edit/:clientId',
        component: ManageClientComponent,
      },
    ],
  },
];
