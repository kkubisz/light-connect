import { DatePipe, JsonPipe } from '@angular/common';
import {
  AfterViewInit,
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
import { Client2 } from '../../model/Client';
import { mapClientType } from '../../../utlis/map-client-type';

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
export class WeddingClientsComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) clientsData!: Client2[];
  weddingClients: Client2[] = [];
  displayedColumns: string[] = ['No', 'name', 'type', 'location', 'date'];
  dataSource: MatTableDataSource<Client2>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.weddingClients);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientsData'] && changes['clientsData'].currentValue) {
      console.log('change cos');
      this.updateMatTable();
    }
  }

  ngAfterViewInit(): void {
    this.updateMatTable();
  }

  updateMatTable() {
    this.weddingClients = this.clientsData.filter(
      (client) => client.client_type === '1'
    );

    this.dataSource = new MatTableDataSource<Client2>(this.weddingClients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mapClientType(type: string): string {
    return mapClientType(type);
  }
}
