import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseInfoComponent } from '../base-info/base-info.component';
import { Client } from '../../clients/model/Client';
import { getIcon } from '../../utlis/icon-type';

type TotalClientsData = {
  currentYear: number;
  lastYear: number;
  diffrenceValue: number;
  diffrencePercentage: number;
  iconType: string;
  footNote: string;
};

@Component({
  selector: 'app-total-clients',
  standalone: true,
  imports: [BaseInfoComponent],
  templateUrl: './total-clients.component.html',
  styleUrl: './total-clients.component.scss',
})
export class TotalClientsComponent implements OnChanges {
  @Input({ required: true }) clients: Client[] = [];

  totalClientData: TotalClientsData = {} as TotalClientsData;

  ngOnChanges(changes: SimpleChanges): void {
    this.compaerClientsToLastYear();
  }

  compaerClientsToLastYear(): void {
    const clientByCurrentYar = this.getCurrentYearData(this.clients);
    const clientByLastYear = this.getCurrentYearData(this.clients, true);

    const comparedClients = clientByCurrentYar.length - clientByLastYear.length;
    const percentageCompare = (comparedClients / clientByLastYear.length) * 100;

    this.totalClientData = {
      currentYear: clientByCurrentYar.length,
      lastYear: clientByLastYear.length,
      diffrenceValue: comparedClients,
      diffrencePercentage: percentageCompare,
      iconType: getIcon(comparedClients),
      footNote: percentageCompare + '% compare to last year',
    };
  }

  getCurrentYearData(data: Client[], compare: boolean = false) {
    let currentYear = new Date().getFullYear();
    return data.filter((item) => {
      const date = new Date(item.date);

      return date.getFullYear() === (compare ? currentYear - 1 : currentYear);
    });
  }
}
