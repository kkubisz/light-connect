import { DatePipe, JsonPipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Client } from '../../model/Client';

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
    JsonPipe,
  ],
  templateUrl: './wedding-clients.component.html',
  styleUrl: './wedding-clients.component.scss',
})
export class WeddingClientsComponent implements OnChanges {
  @Input({ required: true }) clientsData!: Client[];

  weddingClients: Client[] = [];

  displayedColumns: string[] = ['No', 'name', 'type', 'location', 'date'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.weddingClients);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientsData'] && changes['clientsData'].currentValue) {
      this.weddingClients = this.clientsData.filter(
        (client) => client.client_type === '1'
      );

      this.dataSource = new MatTableDataSource<Client>(this.weddingClients);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
