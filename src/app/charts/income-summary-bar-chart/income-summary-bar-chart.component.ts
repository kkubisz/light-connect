import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Client2 } from '../../clients/model/Client';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-income-summary-bar-chart',
  standalone: true,
  imports: [BaseChartDirective, BaseChartComponent],
  templateUrl: './income-summary-bar-chart.component.html',
})
export class IncomeSummaryBarChartComponent {
  @Input({ required: true }) clientsData!: Client2[];

  barChartData: ChartData<'bar'> = { datasets: [] };

  incomeDataByClientType: {
    clientType: string;
    incomePricePerMonth: number[];
    totalCostPerMonth: number[];
  }[] = [];

  dataClient: {
    clientType: string;
    incomePricePerMonth: number[];
    totalCostPerMonth: number[];
  }[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientsData'] && changes['clientsData'].currentValue) {
      this.dataClient = this.calculateIncomeDataByClientType(this.clientsData);

      if (this.dataClient[0]?.incomePricePerMonth !== undefined) {
        this.generateData();
      }
    }
  }

  calculateIncomeDataByClientType(data: Client2[]) {
    const clientTypeMap: {
      [key: string]: {
        incomePricePerMonth: number[];
        totalCostPerMonth: number[];
      };
    } = {};

    data.forEach((item) => {
      const date = new Date(item.date.seconds * 1000);
      const month = date.getMonth();
      const price = item.price;
      const petrol = -Math.abs(item.petrol);
      const additionalCost = -Math.abs(item.additional_cost);
      const totalCost = petrol + additionalCost;
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
    const datasets: {
      data: number[];
      label: string;
      backgroundColor: string;
    }[] = [];
    if (
      this.dataClient[0]?.incomePricePerMonth &&
      this.dataClient[0]?.incomePricePerMonth.length > 0
    ) {
      datasets.push({
        data: this.dataClient[0]['incomePricePerMonth'],
        label: 'Income From Wedding',
        backgroundColor: '#A2D2FF',
      });
    }

    if (
      this.dataClient[1]?.incomePricePerMonth &&
      this.dataClient[1]?.incomePricePerMonth.length > 0
    ) {
      datasets.push({
        data: this.dataClient[1]['incomePricePerMonth'],
        label: 'Income From Family',
        backgroundColor: '#FFC8DD',
      });
    }

    if (
      this.dataClient[2]?.incomePricePerMonth &&
      this.dataClient[2]?.incomePricePerMonth.length > 0
    ) {
      datasets.push({
        data: this.dataClient[2]['incomePricePerMonth'],
        label: 'Income From Commercial',
        backgroundColor: '#CDB4DB',
      });
    }

    if (
      this.dataClient[0]?.totalCostPerMonth &&
      this.dataClient[0]?.totalCostPerMonth.length > 0
    ) {
      datasets.push({
        data: this.dataClient[0]['totalCostPerMonth'],
        label: 'Total Cost From Wedding',
        backgroundColor: '#F94144',
      });
    }

    if (
      this.dataClient[1]?.totalCostPerMonth &&
      this.dataClient[1]?.totalCostPerMonth.length > 0
    ) {
      datasets.push({
        data: this.dataClient[1]['totalCostPerMonth'],
        label: 'Total Cost From Family',
        backgroundColor: '#F3722C',
      });
    }

    if (
      this.dataClient[2]?.totalCostPerMonth &&
      this.dataClient[2]?.totalCostPerMonth.length > 0
    ) {
      datasets.push({
        data: this.dataClient[2]['totalCostPerMonth'],
        label: 'Total Cost From Commercial',
        backgroundColor: '#F8961E',
      });
    }

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
      datasets: datasets,
    };
  }
}
