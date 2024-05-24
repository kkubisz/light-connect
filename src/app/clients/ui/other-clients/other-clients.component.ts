import { DatePipe } from '@angular/common';
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
import { Client } from '../../model/Client';
import { RouterLink } from '@angular/router';

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
export class OtherClientsComponent implements OnChanges {
  @Input({ required: true }) clientsData!: Client[];

  otherClients: Client[] = [];

  displayedColumns: string[] = ['No', 'name', 'type', 'location', 'date'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.otherClients);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientsData'] && changes['clientsData'].currentValue) {
      this.otherClients = this.clientsData.filter(
        (client) => client.client_type !== '1'
      );

      this.dataSource = new MatTableDataSource<Client>(this.otherClients);

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
        return 'Family';
      case '2':
        return 'Commercial';
      default:
        return 'Family';
    }
  }
}
