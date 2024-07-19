import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Client, Client2 } from '../../clients/model/Client';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-upcoming-assignment',
  standalone: true,
  imports: [MatIcon, RouterLink, JsonPipe],
  templateUrl: './upcoming-assignment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingAssignmentComponent {
  @Input({ required: true }) clients: Client2[] = [];
  upcomingAssignment: Client2 = {} as Client2;
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && changes['clients'].currentValue) {
      this.getClosestRecordForCurrentYear();
      // this.cdr.markForCheck();
    }
  }

  getClosestRecordForCurrentYear(): void {
    const currentYear = new Date().getFullYear();
    const today = new Date();

    const recordsThisYear = this.clients.filter((client) => {
      const recordDate = new Date(client.date.seconds * 1000);
      return (
        !isNaN(recordDate.getTime()) &&
        recordDate.getFullYear() === currentYear &&
        recordDate >= today
      );
    });

    if (recordsThisYear.length === 0) {
      this.upcomingAssignment = {} as Client;
      return;
    }

    recordsThisYear.sort((a, b) => {
      const dateA = new Date(a.date.seconds * 1000);
      const dateB = new Date(b.date.seconds * 1000);
      return (
        Math.abs(dateA.getTime() - today.getTime()) -
        Math.abs(dateB.getTime() - today.getTime())
      );
    });

    this.upcomingAssignment = recordsThisYear[0];
  }
}
