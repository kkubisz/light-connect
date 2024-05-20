import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseInfoComponent } from '../base-info/base-info.component';
import { Client } from '../../clients/model/Client';
import { getIcon } from '../../utlis/icon-type';

type TotalIncomeData = {
  currentYear: number;
  lastYear: number;
  diffrenceValue: number;
  diffrencePercentage: number;
  iconType: string;
  footNote: string;
};

@Component({
  selector: 'app-total-income',
  standalone: true,
  imports: [BaseInfoComponent],
  templateUrl: './total-income.component.html',
  styleUrl: './total-income.component.scss',
})
export class TotalIncomeComponent implements OnChanges {
  @Input({ required: true }) clients: Client[] = [];

  totalIncomeData: TotalIncomeData = {} as TotalIncomeData;

  ngOnChanges(changes: SimpleChanges): void {
    this.compaerClientsToLastYear();
  }

  compaerClientsToLastYear(): void {
    const clientCurrentYar = this.getCurrentYearData(this.clients);
    let totalIncome = 0;
    let totalIncomeLastYear = 0;

    clientCurrentYar.forEach((single) => {
      totalIncome += +single.price;
    });

    const clientByLastYear = this.getCurrentYearData(this.clients, true);

    clientByLastYear.forEach((single) => {
      totalIncomeLastYear += +single.price;
    });

    const comparedClients = totalIncome - totalIncomeLastYear;
    const percentageCompare = (comparedClients / totalIncomeLastYear) * 100;

    this.totalIncomeData = {
      currentYear: totalIncome,
      lastYear: totalIncomeLastYear,
      diffrenceValue: comparedClients,
      diffrencePercentage: percentageCompare,
      iconType: getIcon(comparedClients),
      footNote: percentageCompare.toFixed(2) + '% compare to last year',
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
