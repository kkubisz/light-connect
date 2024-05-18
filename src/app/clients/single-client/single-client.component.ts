import { Component, Input, OnInit, inject } from '@angular/core';
import { ClientsService } from '../data-access/clients.service';
import { Client } from '../model/Client';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-single-client',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './single-client.component.html',
  styleUrl: './single-client.component.scss',
})
export class SingleClientComponent implements OnInit {
  @Input() clientId?: string;
  private clientService = inject(ClientsService);

  client: Client = {} as Client;
  ngOnInit(): void {
    if (this.clientId) {
      this.clientService.getClient(this.clientId).subscribe({
        next: (response) => {
          if (response.body) {
            console.log(response.body);
            this.client = response.body;
          }
        },
      });
    }
  }
}
