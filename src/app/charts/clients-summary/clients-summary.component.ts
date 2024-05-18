import { Component, OnInit, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClientsService } from '../../clients/data-access/clients.service';
import { Client } from '../../clients/model/Client';
import { BaseChartComponent } from '../base-chart/base-chart.component';
@Component({
  selector: 'app-clients-summary',
  standalone: true,
  imports: [BaseChartDirective, BaseChartComponent],
  templateUrl: './clients-summary.component.html',
  styleUrl: './clients-summary.component.scss',
})
export class ClientsSummaryComponent implements OnInit {
  private clientService = inject(ClientsService);
  doughnutChartData: ChartData<'doughnut'> = { datasets: [] };
  recordCountArray: number[] = [];

  dataClient: any = [];
  title: string = 'Clients per Month in [Year]';

  description: string =
    'This chart shows the number of clients per month for the year [Year].';

  ngOnInit(): void {
    this.clientService.getAll(['1', '2', '3']).subscribe({
      next: (response) => {
        if (response.ok) {
          if (Array.isArray(response.body)) {
            this.dataClient = this.calculateRecordCountByClientType(
              response.body
            );

            this.generateData();
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateRecordCountByClientType(data: Client[]) {
    const recordCountMap: { [clientType: string]: number } = {};

    data.forEach((item) => {
      const clientType = item.client_type;

      if (!recordCountMap[clientType]) {
        recordCountMap[clientType] = 0;
      }

      recordCountMap[clientType] += 1;
    });

    return recordCountMap;
  }

  public doughnutChartType: ChartType = 'doughnut';

  generateData() {
    this.doughnutChartData = {
      labels: ['Wedding', 'Family', 'Commercial'],
      datasets: [{ data: Object.values(this.dataClient) }],
    };
  }

  public chartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    aspectRatio: 2,

    responsive: true,

    plugins: {
      colors: {},
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };
}
