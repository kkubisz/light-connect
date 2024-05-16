import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientsService } from '../../clients/data-access/clients.service';
import { Client } from '../../clients/model/Client';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface UserData {
  id: string;
  projectId: string;
  name: string;
  groom_name: string;
  groom_surname: string;
  groom_location: string;
  groom_phone_number: string;
  bridge_name: string;
  bridge_surname: string;
  bridge_location: string;
  bridge_phone_number: string;
  location: string;
  date: string;
  venue: string;
  type: string;
  price: string;
  additional_cost: string;
  petrol: string;
  session_type: string;
  other: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  private clientService = inject(ClientsService);

  private clients: Client[] = [];

  displayedColumns: string[] = ['No', 'name', 'type', 'location', 'date'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.getAllClients();
    this.dataSource = new MatTableDataSource(this.clients);
  }

  getAllClients(): void {}

  ngAfterViewInit() {
    this.clientService.getAll('1').subscribe({
      next: (response) => {
        if (response.ok) {
          if (Array.isArray(response.body)) {
            this.clients = response.body;
            this.dataSource = new MatTableDataSource<Client>(this.clients);

            console.log(this.clients);

            console.log('s', this.dataSource);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mapWeddingType(type: string) {
    switch (type) {
      case '1':
        return 'Church Wedding';
        break;
      case '2':
        return 'Civil Wedding';
        break;
      default:
        return 'Churcha Wedding';
    }
  }
}
