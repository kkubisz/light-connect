import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { ClientsService } from '../../clients/data-access/clients.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Client, Client2 } from '../../clients/model/Client';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-clients-month-line-chart',
  standalone: true,
  imports: [BaseChartDirective, BaseChartComponent],
  templateUrl: './clients-month-line-chart.component.html',
})
export class ClientsMonthLineChartComponent implements OnChanges {
  @Input({ required: true }) clientsData!: Client[];

  lineChartData: ChartData<'line'> = { datasets: [] };
  recordCountArray: number[] = [];

  dataClient: number[] = [];
  totalOrdersPerMonth: number[] = Array(12).fill(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientsData'] && changes['clientsData'].currentValue) {
      this.dataClient = this.calculateTotalOrdersPerMonth(this.clientsData);
      this.generateData();
    }
  }

  calculateTotalOrdersPerMonth(data: Client2[]) {
    this.totalOrdersPerMonth = Array(12).fill(0);

    data.forEach((item) => {
      const date = new Date(item.date.seconds * 1000);
      const month = date.getMonth();
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
