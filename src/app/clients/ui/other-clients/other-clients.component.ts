import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../../model/Client';
import { ClientsService } from '../../data-access/clients.service';
import { RouterLink } from '@angular/router';
import { BaseClientsComponent } from '../base-clients/base-clients.component';

@Component({
  selector: 'app-other-clients',
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
  templateUrl: './other-clients.component.html',
  styleUrl: './other-clients.component.scss',
})
export class OtherClientsComponent extends BaseClientsComponent {
  getClientTypes(): string[] {
    return ['2', '3'];
  }

  mapClientType(type: string): string {
    switch (type) {
      case '2':
        return 'Family';
      case '3':
        return 'Commercial';
      default:
        return 'Family';
    }
  }
}
