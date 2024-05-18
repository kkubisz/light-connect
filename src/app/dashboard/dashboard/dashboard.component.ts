import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { WeddingClientsComponent } from '../../clients/ui/wedding-clients/wedding-clients.component';
import { OtherClientsComponent } from '../../clients/ui/other-clients/other-clients.component';
import { UpcomingAssignmentComponent } from '../ui/upcoming-assignment/upcoming-assignment.component';
import { IncomeSummaryComponent } from '../../charts/income-summary/income-summary.component';
import { ClientsSummaryComponent } from '../../charts/clients-summary/clients-summary.component';
import { ClientsMonthComponent } from '../../charts/clients-month/clients-month.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatTabsModule,
    WeddingClientsComponent,
    OtherClientsComponent,
    UpcomingAssignmentComponent,
    IncomeSummaryComponent,
    ClientsSummaryComponent,
    ClientsMonthComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
