import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClientsService } from '../../clients/data-access/clients.service';
import { Client } from '../../clients/model/Client';
import { BaseChartComponent } from '../base-chart/base-chart.component';
import { AppConfigStateService } from '../../config/config.state.service';
@Component({
  selector: 'app-clients-summary-doughnut-chart',
  standalone: true,
  imports: [BaseChartDirective, BaseChartComponent],
  templateUrl: './clients-summary-doughnut-chart.component.html',
  styleUrl: './clients-summary-doughnut-chart.component.scss',
})
export class ClientsSummaryDoughnutChartComponent implements OnChanges {
  @Input({ required: true }) clientsData!: Client[];

  doughnutChartData: ChartData<'doughnut'> = { datasets: [] };
  recordCountArray: number[] = [];

  dataClient: any = [];
  title: string = `Clients per Month in `;

  description: string =
    'This chart shows the number of clients per month for the year .';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientsData'] && changes['clientsData'].currentValue) {
      this.dataClient = this.calculateRecordCountByClientType(this.clientsData);

      this.generateData();
    }
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
    const datasets: any[] = [];

    if (this.dataClient[1] > 0) {
      datasets.push({
        data: this.dataClient[1],
        label: 'Wedding',
        backgroundColor: '#A2D2FF',
      });
    }

    if (this.dataClient[2] > 0) {
      datasets.push({
        data: this.dataClient[2],
        label: 'Family',
        backgroundColor: '#FFC8DD',
      });
    }

    if (this.dataClient[3] > 0) {
      datasets.push({
        data: this.dataClient[3],
        label: 'Commercial',
        backgroundColor: '#CDB4DB',
      });
    }

    const labels = ['Wedding', 'Family', 'Commercial'].filter(
      (label, index) => {
        return Object.keys(this.dataClient).includes((index + 1).toString());
      }
    );

    this.doughnutChartData = {
      labels: labels,
      datasets: [{ data: Object.values(this.dataClient) }],
    };
  }

  generateDataset(
    clientTypeId: number,
    label: string,
    backgroundColor: string
  ) {
    return {
      data: [this.dataClient[clientTypeId]],
      label: label,
      backgroundColor: backgroundColor,
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
