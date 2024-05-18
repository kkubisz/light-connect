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

  getClient(clientId: string) {
    return this.http.get<Client>(
      `${this.ClientSeriveURL}/clients/${clientId}`,
      { observe: 'response' }
    );
  }

  delete(taskId: number) {
    return this.http.delete(`${this.ClientSeriveURL}/clients/${taskId}`);
  }

  update(taskId: number, payload: any) {
    return this.http.patch(
      `${this.ClientSeriveURL}/clients/${taskId}`,
      payload
    );
  }

  add(payload: any) {
    return this.http.post<Client>(`${this.ClientSeriveURL}/clients`, payload);
  }
}
