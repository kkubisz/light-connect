import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Client } from '../../clients/model/Client';
import { getIcon } from '../../utlis/icon-type';
import { BaseInfoComponent } from '../base-info/base-info.component';

type TotalCostData = {
  currentYear: number;
  lastYear: number;
  diffrenceValue: number;
  diffrencePercentage: number;
  iconType: string;
  footNote: string;
};

@Component({
  selector: 'app-total-cost',
  standalone: true,
  imports: [BaseInfoComponent],
  templateUrl: './total-cost.component.html',
  styleUrl: './total-cost.component.scss',
})
export class TotalCostComponent implements OnChanges {
  @Input({ required: true }) clients: Client[] = [];
  totalCostData: TotalCostData = {} as TotalCostData;

  ngOnChanges(changes: SimpleChanges): void {
    this.compaerClientsToLastYear();
  }

  compaerClientsToLastYear(): void {
    const clientCurrentYar = this.getCurrentYearData(this.clients);
    let totalCost = 0;
    let totalCostLastYear = 0;

    clientCurrentYar.forEach((single) => {
      totalCost += +single.additional_cost;
      totalCost += +single.petrol;
    });

    const clientByLastYear = this.getCurrentYearData(this.clients, true);

    clientByLastYear.forEach((single) => {
      totalCostLastYear += +single.petrol;
      totalCostLastYear += +single.additional_cost;
    });

    const comparedClients = totalCost - totalCostLastYear;
    const percentageCompare = (comparedClients / totalCost) * 100;

    let calculatedCost =
      totalCostLastYear > totalCost
        ? +Math.abs(percentageCompare)
        : -Math.abs(percentageCompare);

    this.totalCostData = {
      currentYear: -Math.abs(totalCost),
      lastYear: totalCostLastYear,
      diffrenceValue: comparedClients,
      diffrencePercentage: percentageCompare,
      iconType: getIcon(calculatedCost),
      footNote: calculatedCost.toFixed(2) + '% compare to last year',
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
