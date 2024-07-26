import { Component, Input, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { AppConfigStateService } from '../../config/config.state.service';

@Component({
  selector: 'app-base-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './base-chart.component.html',
  styleUrl: './base-chart.component.scss',
})
export class BaseChartComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) description: string = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) chartData: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) chartOptions: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) chartType: any = '';
  @Input({ required: true }) chartId: string = '';

  private configState = inject(AppConfigStateService);
  $selectedYear = this.configState.selectedYear;
}
