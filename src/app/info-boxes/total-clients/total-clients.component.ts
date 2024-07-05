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
import { getPreviousYearClient } from '../../utlis/previous-client';

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
})
export class TotalClientsComponent implements OnChanges {
  @Input({ required: true }) clients!: Client[];
  @Input({ required: true }) clientYearly!: Client[];

  private configState = inject(AppConfigStateService);
  $view = this.configState.selectedYear;

  totalClientData: TotalClientsData = {} as TotalClientsData;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientYearly'] && changes['clientYearly'].currentValue) {
      this.compaerClientsToLastYear();
    }
  }

  compaerClientsToLastYear(): void {
    const clientByCurrentYar = this.clientYearly;
    const clientByLastYear = this.getPreviousYearClient();
    const comparedClients = clientByCurrentYar.length - clientByLastYear.length;
    let percentageCompare = 0;

    if (clientByLastYear.length !== 0) {
      percentageCompare = (comparedClients / clientByLastYear.length) * 100;
    }

    this.totalClientData = {
      currentYear: clientByCurrentYar.length,
      lastYear: clientByLastYear.length,
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
    return getPreviousYearClient(this.clients, this.$view());
  }
}
