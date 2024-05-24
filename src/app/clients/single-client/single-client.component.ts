import { Component, Input, OnInit, inject } from '@angular/core';
import { ClientsService } from '../data-access/clients.service';
import { Client } from '../model/Client';
import { MatChipsModule } from '@angular/material/chips';
import { WeddingComponent } from './ui/wedding/wedding.component';
import { FamilyComponent } from './ui/family/family.component';
import { DatePipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-client',
  standalone: true,
  imports: [
    MatChipsModule,
    WeddingComponent,
    FamilyComponent,
    DatePipe,
    MatSlideToggleModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './single-client.component.html',
  styleUrl: './single-client.component.scss',
})
export class SingleClientComponent implements OnInit {
  @Input() clientId?: string;
  private clientService = inject(ClientsService);
  hidden = true;

  client: Client = {} as Client;
  ngOnInit(): void {
    if (this.clientId) {
      this.clientService.getClient(this.clientId).subscribe({
        next: (response) => {
          if (response.body) {
            this.client = response.body;
          }
        },
      });
    }
  }
  openDropdown() {
    this.hidden = !this.hidden;
    console.log(this.hidden);
  }
}
