import { Component, Input, SimpleChanges } from '@angular/core';
import { Client } from '../../clients/model/Client';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-upcoming-assignment',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './upcoming-assignment.component.html',
  styleUrl: './upcoming-assignment.component.scss',
})
export class UpcomingAssignmentComponent {
  @Input({ required: true }) clients: Client[] = [];

  upcomingAssignment: Client = {} as Client;
  ngOnChanges(changes: SimpleChanges): void {
    this.getClosestRecordForCurrentYear();
  }

  getClosestRecordForCurrentYear(): void {
    const currentYear = new Date().getFullYear();
    const today = new Date();

    const recordsThisYear = this.clients.filter((client) => {
      const recordDate = new Date(client.date);
      return recordDate.getFullYear() === currentYear;
    });

    if (recordsThisYear.length === 0) {
      return;
    }

    recordsThisYear.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return (
        Math.abs(dateA.getTime() - today.getTime()) -
        Math.abs(dateB.getTime() - today.getTime())
      );
    });

    this.upcomingAssignment = recordsThisYear[0];
  }
}
