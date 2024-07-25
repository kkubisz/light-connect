// import { AfterViewInit, ViewChild, Directive, inject } from '@angular/core';

// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { Client } from '../../model/Client';
// import { ClientsService } from '../../data-access/clients.service';

// @Directive()
// export abstract class BaseClientsComponent implements AfterViewInit {
//   private clientService = inject(ClientsService);
//   private clients: Client[] = [];

//   displayedColumns: string[] = ['No', 'name', 'type', 'location', 'date'];
//   dataSource: MatTableDataSource<Client>;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor() {
//     console.log('basesss');

//     this.dataSource = new MatTableDataSource(this.clients);
//   }

//   abstract getClientTypes(): string[];

//   ngAfterViewInit() {
//     this.clientService.getAll().subscribe({
//       next: (response) => {
//         console.log('resr', response);

//         if (response.ok) {
//           if (Array.isArray(response.body)) {
//             this.clients = response.body;
//             this.dataSource = new MatTableDataSource<Client>(this.clients);

//             this.dataSource.paginator = this.paginator;
//             this.dataSource.sort = this.sort;
//           }
//         }
//       },
//       error: (error) => {
//         console.log(error);
//       },
//     });
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   abstract mapClientType(type: string): string;
// }
