import { Component, Input, OnInit, inject } from '@angular/core';
import { ClientsService } from '../data-access/clients.service';
import { Client, ClientStatus } from '../model/Client';
import { MatChipsModule } from '@angular/material/chips';
import { WeddingComponent } from './ui/wedding/wedding.component';
import { FamilyComponent } from './ui/family/family.component';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '../../shared/snackbar/service/snackbar.service';
import { SunriseSunsetComponent } from '../../sunrise-sunset/sunrise-sunset.component';
import { WheaterComponent } from '../../wheater/wheater.component';

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
    JsonPipe,
    SunriseSunsetComponent,
    WheaterComponent,
  ],
  templateUrl: './single-client.component.html',
  styleUrl: './single-client.component.scss',
})
export class SingleClientComponent implements OnInit {
  @Input() clientId?: string;
  private clientService = inject(ClientsService);
  private snackbarService = inject(SnackbarService);
  hidden = true;

  currentDate = new Date();
  clientDate: Date = new Date();
  showWheater = false;

  client: Client = {} as Client;
  ngOnInit(): void {
    if (this.clientId) {
      this.clientService.getClient(this.clientId).subscribe({
        next: (response) => {
          if (response.body) {
            this.client = response.body;
            this.clientDate = new Date(response.body.date);

            console.log(this.currentDate);
            console.log(this.clientDate);

            const timeDifference =
              this.clientDate.getTime() - this.currentDate.getTime();

            const daysDifference = timeDifference / (1000 * 3600 * 24);

            console.log(daysDifference);

            if (daysDifference <= 7) {
              console.log('pokaz');
              this.showWheater = true;
            }
          }
        },
        error: (error) => {
          console.log('errpr', error);
        },
      });
    }
  }

  updateStatus(statusId: number) {
    if (this.client?.client_status) {
      const status = this.client.client_status.find((s) => s.id === statusId);
      const finalStatus = status?.id === 6;

      if (status) {
        status.status = !status.status;

        this.clientService.updateClient(this.client).subscribe({
          next: (response) => {
            if (finalStatus && status.status) {
              this.snackbarService.show(
                'Wohho! You are done with it! You deserve good coffee',
                'check'
              );
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }
}
