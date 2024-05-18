import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BaseClientsComponent } from '../base-clients/base-clients.component';

@Component({
  selector: 'app-wedding-clients',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './wedding-clients.component.html',
  styleUrl: './wedding-clients.component.scss',
})
export class WeddingClientsComponent extends BaseClientsComponent {
  getClientTypes(): string[] {
    return ['1'];
  }

  mapClientType(type: string): string {
    switch (type) {
      case '1':
        return 'Church Wedding';
      case '2':
        return 'Civil Wedding';
      default:
        return 'Church Wedding';
    }
  }
}
