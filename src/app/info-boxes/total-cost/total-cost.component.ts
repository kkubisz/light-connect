import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Client } from '../../clients/model/Client';
import { getIcon } from '../../utlis/icon-type';
import { BaseInfoComponent } from '../base-info/base-info.component';
import { AppConfigStateService } from '../../config/config.state.service';

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
  @Input({ required: true }) clientYearly!: Client[];

  private configState = inject(AppConfigStateService);
  $view = this.configState.taskListView;
  totalCostData: TotalCostData = {} as TotalCostData;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientYearly'] && changes['clientYearly'].currentValue) {
      this.compaerClientsToLastYear();
    }
  }

  compaerClientsToLastYear(): void {
    const clientCurrentYar = this.clientYearly;
    let totalCost = 0;
    let totalCostLastYear = 0;

    clientCurrentYar.forEach((single) => {
      totalCost += +single.additional_cost;
      totalCost += +single.petrol;
    });

    const clientByLastYear = this.getPreviousYearClient();

    clientByLastYear.forEach((single) => {
      totalCostLastYear += +single.petrol;
      totalCostLastYear += +single.additional_cost;
    });

    const comparedClients = totalCost - totalCostLastYear;
    let percentageCompare = 0;

    if (totalCostLastYear !== 0) {
      percentageCompare = (comparedClients / totalCost) * 100;
    }

    let calculatedCost =
      totalCostLastYear > totalCost
        ? +Math.abs(percentageCompare)
        : -Math.abs(percentageCompare);

    this.totalCostData = {
      currentYear: -Math.abs(totalCost),
      lastYear: totalCostLastYear,
      diffrenceValue: comparedClients,
      diffrencePercentage: percentageCompare,
      iconType: percentageCompare === 0 ? '' : getIcon(calculatedCost),
      footNote:
        percentageCompare === 0
          ? 'No data from previous year'
          : calculatedCost.toFixed(2) + '% compare to last year',
    };
  }

  getPreviousYearClient() {
    return this.clients.filter((client) => {
      const date = new Date(client.date);

      return date.getFullYear() === this.$view() - 1;
    });
  }
}
