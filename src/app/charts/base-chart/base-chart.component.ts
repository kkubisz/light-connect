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
  @Input({ required: true }) chartData: unknown = '';
  @Input({ required: true }) chartOptions: unknown = '';
  @Input({ required: true }) chartType: unknown = '';
  @Input({ required: true }) chartId: string = '';

  private configState = inject(AppConfigStateService);
  $selectedYear = this.configState.selectedYear;
}
