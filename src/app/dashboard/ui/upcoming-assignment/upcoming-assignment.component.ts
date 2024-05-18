import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-upcoming-assignment',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './upcoming-assignment.component.html',
  styleUrl: './upcoming-assignment.component.scss',
})
export class UpcomingAssignmentComponent {
  // Pie
  public doughnutChartLabels: string[] = ['Wedding', 'Family', 'Commercial'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [18, 3, 1] }],
  };
  public doughnutChartType: ChartType = 'doughnut';
}
