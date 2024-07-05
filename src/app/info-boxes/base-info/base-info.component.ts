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
  @Input({ required: true }) title = '';
  @Input({ required: true }) value = 0;
  @Input({ required: true }) diffrenceValue = 0;
  @Input({ required: true }) icon = '';
  @Input({ required: true }) iconColor = '';
  @Input({ required: true }) footNote = '';
  @Input({ required: true }) iconType = '';
  @Input({ required: true }) percentageDifference = 0;
}
