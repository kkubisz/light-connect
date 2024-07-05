import { Component, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../shared/snackbar/service/snackbar.service';
import { NgIf } from '@angular/common';
import { getErrorMessage } from '../../utlis/error-messae';

export interface UserInteraface {
  email: string;
  username: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SnackbarComponent,
    RouterLink,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        console.log('aaaa', user);

        return true;
      } else {
        console.log('false');

        return false;
      }
    });
  }
  private formBuilder = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  form = this.formBuilder.group({
    email: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control<string>('', [Validators.required]),
  });

  errorMessage: string | null = null;

  submit() {
    const rawValue = this.form.getRawValue();

    this.authService.login(rawValue.email, rawValue.password).subscribe({
      next: (displayName) => {
        this.snackbarService.show(`Welcome back ${displayName}`, 'check');
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        this.snackbarService.show(`${error.code}`, 'warning');
      },
    });
  }

  getErrorMessage(control: FormControl): string {
    return getErrorMessage(control);
  }
}
