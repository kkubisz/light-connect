import { Routes } from '@angular/router';
import { ManageClientComponent } from './clients/manage-client/manage-client.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SingleClientComponent } from './clients/single-client/single-client.component';
import { MapsComponent } from './maps/maps/maps.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'map',
    component: MapsComponent,
  },
  {
    path: 'clients',
    title: 'Clients',
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
