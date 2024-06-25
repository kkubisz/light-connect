import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../model/Client';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  DatePipe,
  JsonPipe,
  NgFor,
  NgIf,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';

@Component({
  selector: 'app-wedding',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    NgFor,
    NgIf,
    UpperCasePipe,
    TitleCasePipe,
    JsonPipe,
    DatePipe,
  ],
  templateUrl: './wedding.component.html',
  styleUrl: './wedding.component.scss',
})
export class WeddingComponent {
  @Input({ required: true }) client!: Client;
  @Output() updateStatus = new EventEmitter<number>();

  toggleStatus(statusId: number) {
    this.updateStatus.emit(statusId);
  }

  replaceUnderscore(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
