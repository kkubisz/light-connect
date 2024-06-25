import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackbarMessageComponent,
  SnackbarMessageData,
} from '../snackbar-message/snackbar-message.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  show(message: string, type: SnackbarMessageData['type']) {
    this.snackBar.openFromComponent(SnackbarMessageComponent, {
      data: {
        message: message,
        type: type,
      },
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar', `alert-${type}`],
    });
  }
}
