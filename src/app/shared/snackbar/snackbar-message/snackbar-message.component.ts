import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar.component';

export interface SnackbarMessageData {
  message: string;
  action?: string;
  icon?: string;
  type: 'notifications' | 'warning' | 'check';
}

@Component({
  selector: 'app-snackbar-message',
  standalone: true,
  imports: [MatIcon, JsonPipe],
  templateUrl: './snackbar-message.component.html',
  styleUrl: './snackbar-message.component.scss',
})
export class SnackbarMessageComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarMessageData,
    private snackBarRef: MatSnackBarRef<SnackbarComponent>
  ) {}

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
