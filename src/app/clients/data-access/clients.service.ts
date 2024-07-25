// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { Client } from '../model/Client';
// import { Observable, forkJoin, map, switchMap } from 'rxjs';

// interface ClientStatus {
//   id: number;
//   name: string;
//   status: boolean;
// }

// export type ClientTypeParam = {
//   client_type: string | string[];
// };

// @Injectable({
//   providedIn: 'root',
// })
// export class ClientsService {
//   private ClientSeriveURL = 'http://localhost:3000';

//   private http = inject(HttpClient);

//   getAll(clientType?: ClientTypeParam) {
//     return this.http.get<Client[]>(`${this.ClientSeriveURL}/clients`, {
//       observe: 'response',
//       params: clientType,
//     });
//   }

//   getAllByYear(year: number) {
//     return this.http.get<Client[]>(`${this.ClientSeriveURL}/clients`, {
//       observe: 'response',
//       params: { year },
//     });
//   }

//   getClient(clientId: string) {
//     return this.http.get<Client>(
//       `${this.ClientSeriveURL}/clients/${clientId}`,
//       { observe: 'response' }
//     );
//   }

//   getClientTest(
//     clientId: string
//   ): Observable<{ client: Client; statuses: ClientStatus[] }> {
//     return this.http
//       .get<Client>(`${this.ClientSeriveURL}/clients/${clientId}`)
//       .pipe(
//         switchMap((client) => {
//           const statusRequests = client.client_status
//             ? client.client_status.map((statusId) =>
//                 this.http.get<ClientStatus>(
//                   `${this.ClientSeriveURL}/client_status/${statusId}`
//                 )
//               )
//             : [];

//           console.log(client.client_status);

//           return forkJoin(statusRequests).pipe(
//             map((statuses) => ({ client, statuses }))
//           );
//         })
//       );
//   }

//   delete(taskId: number) {
//     return this.http.delete(`${this.ClientSeriveURL}/clients/${taskId}`);
//   }

//   update(clientId: number, payload: any) {
//     return this.http.patch(
//       `${this.ClientSeriveURL}/clients/${clientId}`,
//       payload
//     );
//   }

//   add(payload: any) {
//     return this.http.post<Client>(`${this.ClientSeriveURL}/clients`, payload);
//   }

//   updateClient(client: Client): Observable<Client> {
//     return this.http.put<Client>(
//       `${this.ClientSeriveURL}/clients/${client.id}`,
//       client
//     );
//   }
// }
