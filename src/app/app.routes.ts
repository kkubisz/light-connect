import { Routes } from '@angular/router';
import { AddNewClientComponent } from './clients/add-new-client/add-new-client.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'clients',
    title: 'Clients',
    children: [
      {
        path: 'add',
        component: AddNewClientComponent,
      },
    ],
  },
];
