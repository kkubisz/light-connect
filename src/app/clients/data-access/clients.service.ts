import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private ClientSeriveURL = 'http://localhost:3000';

  private http = inject(HttpClient);

  getAll(client_type: string | string[]) {
    return this.http.get<Client[]>(`${this.ClientSeriveURL}/clients`, {
      observe: 'response',
      params: { client_type },
    });
  }

  getAllByYear(year: number) {
    return this.http.get<Client[]>(`${this.ClientSeriveURL}/clients`, {
      observe: 'response',
      params: { year },
    });
  }

  getClient(clientId: string) {
    return this.http.get<Client>(
      `${this.ClientSeriveURL}/clients/${clientId}`,
      { observe: 'response' }
    );
  }

  delete(taskId: number) {
    return this.http.delete(`${this.ClientSeriveURL}/clients/${taskId}`);
  }

  update(clientId: number, payload: any) {
    return this.http.patch(
      `${this.ClientSeriveURL}/clients/${clientId}`,
      payload
    );
  }

  add(payload: any) {
    return this.http.post<Client>(`${this.ClientSeriveURL}/clients`, payload);
  }
}
