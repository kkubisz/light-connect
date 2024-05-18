import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClientsService } from '../../clients/data-access/clients.service';
import { Client } from '../../clients/model/Client';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-income-summary',
  standalone: true,
  imports: [BaseChartDirective, BaseChartComponent],
  templateUrl: './income-summary.component.html',
  styleUrl: './income-summary.component.scss',
})
export class IncomeSummaryComponent implements OnInit {
  private clientService = inject(ClientsService);
  private clients: Client[] = [];
  barChartData: ChartData<'bar'> = { datasets: [] };

  incomeDataByClientType: {
    clientType: string;
    incomePricePerMonth: number[];
    totalCostPerMonth: number[];
  }[] = [];

  dataClient: any = [];

  title: string = 'Clients per Month in [Year]';

  description: string =
    'This chart shows the number of clients per month for the year [Year].';

  ngOnInit(): void {
    this.clientService.getAll(['1', '2', '3']).subscribe({
      next: (response) => {
        if (response.ok) {
          if (Array.isArray(response.body)) {
            this.clients = response.body;

            this.dataClient = this.calculateIncomeDataByClientType(
              response.body
            );

            console.log(this.dataClient);

            this.generateData();
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateIncomeDataByClientType(data: Client[]) {
    const clientTypeMap: {
      [key: string]: {
        incomePricePerMonth: number[];
        totalCostPerMonth: number[];
      };
    } = {};

    data.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth(); // Miesiące są indeksowane od 0 (styczeń) do 11 (grudzień)
      const price = parseFloat(item.price);
      const petrol = -Math.abs(parseFloat(item.petrol)); // Upewnij się, że wartość jest ujemna
      const additionalCost = -Math.abs(parseFloat(item.additional_cost)); // Upewnij się, że wartość jest ujemna
      const totalCost = petrol + additionalCost; // Sumujemy koszty
      const clientType = item.client_type;

      if (!clientTypeMap[clientType]) {
        clientTypeMap[clientType] = {
          incomePricePerMonth: Array(12).fill(0),
          totalCostPerMonth: Array(12).fill(0),
        };
      }

      if (!isNaN(price)) {
        clientTypeMap[clientType].incomePricePerMonth[month] += price;
      }

      if (!isNaN(totalCost)) {
        clientTypeMap[clientType].totalCostPerMonth[month] += totalCost;
      }
    });

    this.incomeDataByClientType = Object.keys(clientTypeMap).map(
      (clientType) => ({
        clientType,
        incomePricePerMonth: clientTypeMap[clientType].incomePricePerMonth,
        totalCostPerMonth: clientTypeMap[clientType].totalCostPerMonth,
      })
    );

    return this.incomeDataByClientType;
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#fff',
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: '#fff',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };

  generateData() {
    this.barChartData = {
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
          data: this.dataClient[0]['incomePricePerMonth'],
          label: 'Income From Wedding',
          backgroundColor: '#A2D2FF',
        },
        {
          data: this.dataClient[1]['incomePricePerMonth'],
          label: 'Income From Family',
          backgroundColor: '#FFC8DD',
        },
        {
          data: this.dataClient[2]['incomePricePerMonth'],
          label: 'Income From Commercial',
          backgroundColor: '#CDB4DB',
        },

        {
          data: this.dataClient[0]['totalCostPerMonth'],
          label: 'Total Cost From Wedding',
          backgroundColor: '#F94144',
        },
        {
          data: this.dataClient[1]['totalCostPerMonth'],
          label: 'Total Cost From Family',
          backgroundColor: '#F3722C',
        },
        {
          data: this.dataClient[2]['totalCostPerMonth'],
          label: 'Total Cost From Commercial',
          backgroundColor: '#F8961E',
        },
      ],
    };
  }
}
