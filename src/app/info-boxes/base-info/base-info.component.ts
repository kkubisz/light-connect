import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-base-info',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './base-info.component.html',
  styleUrl: './base-info.component.scss',
})
export class BaseInfoComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) value: number = 0;
  @Input({ required: true }) diffrenceValue: number = 0;
  @Input({ required: true }) icon: string = '';
  @Input({ required: true }) iconColor: string = '';
  @Input({ required: true }) footNote: string = '';
  @Input({ required: true }) iconType: string = '';
  @Input({ required: true }) percentageDifference: number = 0;
}
