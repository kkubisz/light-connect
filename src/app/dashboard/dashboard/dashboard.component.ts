import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { WeddingClientsComponent } from '../../clients/ui/wedding-clients/wedding-clients.component';
import { OtherClientsComponent } from '../../clients/ui/other-clients/other-clients.component';
import { IncomeSummaryBarChartComponent } from '../../charts/income-summary-bar-chart/income-summary-bar-chart.component';
import { ClientsSummaryDoughnutChartComponent } from '../../charts/clients-summary-doughnut-chart/clients-summary-doughnut-chart.component';
import { ClientsMonthLineChartComponent } from '../../charts/clients-month-line-chart/clients-month-line-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { Client } from '../../clients/model/Client';
import { ClientsService } from '../../clients/data-access/clients.service';
import { TotalClientsComponent } from '../../info-boxes/total-clients/total-clients.component';
import { TotalCostComponent } from '../../info-boxes/total-cost/total-cost.component';
import { TotalIncomeComponent } from '../../info-boxes/total-income/total-income.component';
import { UpcomingAssignmentComponent } from '../../info-boxes/upcoming-assignment/upcoming-assignment.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppConfigStateService } from '../../config/config.state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatTabsModule,
    WeddingClientsComponent,
    OtherClientsComponent,
    IncomeSummaryBarChartComponent,
    ClientsSummaryDoughnutChartComponent,
    ClientsMonthLineChartComponent,
    MatIconModule,
    TotalClientsComponent,
    TotalCostComponent,
    TotalIncomeComponent,
    UpcomingAssignmentComponent,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    SnackbarComponent,
    JsonPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private clientService = inject(ClientsService);

  private configState = inject(AppConfigStateService);
  $selectedYear = this.configState.selectedYear;

  clients: Client[] = [];
  uniqueYears: number[] = [];
  currentYear = new Date().getFullYear();
  clientsByYear: Client[] = [];

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next: (response) => {
        if (response.ok) {
          if (Array.isArray(response.body)) {
            this.clients = response.body;

            this.clientsByYear = this.getClientsByYear(this.clients);
            this.uniqueYears = this.getUniqueYears(this.clients);
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getClientsByYear(data: Client[]) {
    return data.filter((item) => {
      const date = new Date(item.date);

      return date.getFullYear() === this.$selectedYear();
    });
  }

  getUniqueYears(data: Client[]): number[] {
    const years = data.map((client) => new Date(client.date).getFullYear());

    const uniqueYears = [...new Set(years)];
    uniqueYears.sort((a, b) => a - b);

    return uniqueYears;
  }

  onValChange(arg0: any) {
    this.$selectedYear.set(+arg0);

    this.clientsByYear = this.getClientsByYear(this.clients);
  }
}
