import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { BaseInfoComponent } from '../base-info/base-info.component';
import { Client } from '../../clients/model/Client';
import { getIcon } from '../../utlis/icon-type';
import { AppConfigStateService } from '../../config/config.state.service';

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
  @Input({ required: true }) clientYearly!: Client[];

  private configState = inject(AppConfigStateService);
  $view = this.configState.taskListView;

  totalIncomeData: TotalIncomeData = {} as TotalIncomeData;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientYearly'] && changes['clientYearly'].currentValue) {
      this.compaerClientsToLastYear();
    }
  }

  compaerClientsToLastYear(): void {
    const clientCurrentYar = this.clientYearly;
    let totalIncome = 0;
    let totalIncomeLastYear = 0;

    clientCurrentYar.forEach((single) => {
      totalIncome += +single.price;
    });

    const clientByLastYear = this.getPreviousYearClient();

    clientByLastYear.forEach((single) => {
      totalIncomeLastYear += +single.price;
    });

    const comparedClients = totalIncome - totalIncomeLastYear;

    let percentageCompare = 0;

    if (clientByLastYear.length !== 0) {
      percentageCompare = (comparedClients / totalIncomeLastYear) * 100;
    }

    this.totalIncomeData = {
      currentYear: totalIncome,
      lastYear: totalIncomeLastYear,
      diffrenceValue: comparedClients,
      diffrencePercentage: percentageCompare,
      iconType: percentageCompare === 0 ? '' : getIcon(comparedClients),
      footNote:
        percentageCompare === 0
          ? 'No data from previous year'
          : percentageCompare.toFixed(2) + '% compare to last year',
    };
  }

  getPreviousYearClient() {
    return this.clients.filter((client) => {
      const date = new Date(client.date);

      return date.getFullYear() === this.$view() - 1;
    });
  }
}
