import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  SnackbarMessageComponent,
  SnackbarMessageData,
} from './snackbar-message/snackbar-message.component';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatSnackBarModule, MatIcon, SnackbarMessageComponent],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent implements OnInit {
  @Input({ required: true }) message: string = '';
  @Input({ required: true }) type: SnackbarMessageData['type'] =
    'notifications';

  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.snackBar.openFromComponent(SnackbarMessageComponent, {
      data: {
        message: this.message,
        icon: this.type,
      },
      panelClass: ['custom-snackbar', `alert-${this.type}`],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }

  dismiss() {
    this.snackBar.dismiss();
  }
}
