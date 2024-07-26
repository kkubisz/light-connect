import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { WeddingClientsComponent } from '../../clients/ui/wedding-clients/wedding-clients.component';
import { OtherClientsComponent } from '../../clients/ui/other-clients/other-clients.component';
import { IncomeSummaryBarChartComponent } from '../../charts/income-summary-bar-chart/income-summary-bar-chart.component';
import { ClientsSummaryDoughnutChartComponent } from '../../charts/clients-summary-doughnut-chart/clients-summary-doughnut-chart.component';
import { ClientsMonthLineChartComponent } from '../../charts/clients-month-line-chart/clients-month-line-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { Client2 } from '../../clients/model/Client';
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
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../authentication/auth/auth.service';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

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
    SkeletonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  loadingState = false;

  private configState = inject(AppConfigStateService);
  $selectedYear = this.configState.selectedYear;

  clients: Client2[] = [];
  uniqueYears: number[] = [];
  currentYear = new Date().getFullYear();
  clientsByYear: Client2[] = [];

  clientsFirebaseService = inject(FirebaseService);

  ngOnInit(): void {
    this.loadingState = true;
    this.clientsFirebaseService.getClients().subscribe((client) => {
      this.clients = client;

      this.clientsByYear = this.getClientsByYear(client);
      this.uniqueYears = this.getUniqueYears(this.clients);

      this.authService.user$.subscribe((user) => {
        if (user) {
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!,
          });
        } else {
          this.authService.currentUserSig.set(null);
        }
      });

      this.loadingState = false;
    });
  }

  getClientsByYear(data: Client2[]) {
    return data.filter((item) => {
      const date = new Date(item.date.seconds * 1000);

      return date.getFullYear() === this.$selectedYear();
    });
  }

  getUniqueYears(data: Client2[]): number[] {
    const years = data.map((client) =>
      new Date(client.date.seconds * 1000).getFullYear()
    );

    const uniqueYears = [...new Set(years)];
    uniqueYears.sort((a, b) => a - b);

    return uniqueYears;
  }

  onValChange(selectedYear: string) {
    this.$selectedYear.set(+selectedYear);

    this.clientsByYear = this.getClientsByYear(this.clients);
  }
}
