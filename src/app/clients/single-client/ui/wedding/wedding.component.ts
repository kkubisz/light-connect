import { Component, Input } from '@angular/core';
import { Client } from '../../../model/Client';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wedding',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, MatChipsModule],
  templateUrl: './wedding.component.html',
  styleUrl: './wedding.component.scss',
})
export class WeddingComponent {
  @Input({ required: true }) client!: Client;
}
