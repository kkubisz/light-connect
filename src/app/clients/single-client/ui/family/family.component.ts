import { Component, Input } from '@angular/core';
import { Client } from '../../../model/Client';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule],
  templateUrl: './family.component.html',
  styleUrl: './family.component.scss',
})
export class FamilyComponent {
  @Input({ required: true }) client!: Client;
}
