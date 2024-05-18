import { Component, OnInit, inject } from '@angular/core';
import { ClientsService } from '../../clients/data-access/clients.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Client } from '../../clients/model/Client';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-clients-month',
  standalone: true,
  imports: [BaseChartDirective, BaseChartComponent],
  templateUrl: './clients-month.component.html',
  styleUrl: './clients-month.component.scss',
})
export class ClientsMonthComponent implements OnInit {
  private clientService = inject(ClientsService);
  lineChartData: ChartData<'line'> = { datasets: [] };
  recordCountArray: number[] = [];

  dataClient: any = [];
  totalOrdersPerMonth: number[] = Array(12).fill(0);
  title: string = 'Clients per Month in [Year]';

  description: string =
    'This chart shows the number of clients per month for the year [Year].';

  ngOnInit(): void {
    this.clientService.getAll(['1', '2', '3']).subscribe({
      next: (response) => {
        if (response.ok) {
          if (Array.isArray(response.body)) {
            this.dataClient = this.calculateTotalOrdersPerMonth(response.body);

            this.generateData();

            console.log(this.dataClient);
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateTotalOrdersPerMonth(data: Client[]) {
    this.totalOrdersPerMonth = Array(12).fill(0);

    data.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth(); // Miesiące są indeksowane od 0 (styczeń) do 11 (grudzień)

      this.totalOrdersPerMonth[month] += 1;
    });

    return this.totalOrdersPerMonth;
  }

  public lineChartType: ChartType = 'line';

  generateData() {
    this.lineChartData = {
      labels: [
        'Jan(1)',
        'Feb(2)',
        'Mar(3)',
        'Apr(4)',
        'May(5)',
        'Jun(6)',
        'Jul(7)',
        'Aug(8)',
        'Sep(9)',
        'Oct(10)',
        'Nov(11)',
        'Dec(12)',
      ],
      datasets: [
        {
          data: this.dataClient,
          label: 'Number of clients',
          borderColor: '#fff',
          pointBorderColor: '#fff',
          fill: '#fff',
        },
      ],
    };
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    scales: {
      y: {
        position: 'left',
        ticks: {
          color: '#fff',
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          color: '#fff',
        },
      },
    },

    plugins: {
      legend: { display: false },
    },
  };
}
