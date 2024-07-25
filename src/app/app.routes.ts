import { Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth/auth.guard.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./maps/maps/maps.component').then((c) => c.MapsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./authentication/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./authentication/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'clients',
    title: 'Clients',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import('./clients/manage-client/manage-client.component').then(
            (c) => c.ManageClientComponent
          ),
      },
      {
        path: ':clientId',
        title: 'Client',
        loadComponent: () =>
          import('./clients/single-client/single-client.component').then(
            (c) => c.SingleClientComponent
          ),
      },
      {
        path: 'edit/:clientId',
        loadComponent: () =>
          import('./clients/manage-client/manage-client.component').then(
            (c) => c.ManageClientComponent
          ),
      },
    ],
  },
];
