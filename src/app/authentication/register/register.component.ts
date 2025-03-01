import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { getErrorMessage } from '../../utlis/error-messae';
import { NgIf } from '@angular/common';

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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group({
    username: this.formBuilder.control<string>('', [Validators.required]),
    email: this.formBuilder.control<string>('', [
      Validators.email,
      Validators.required,
    ]),
    password: this.formBuilder.control<string>('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  errorMessage: string | null = null;

  submit() {
    const rawValue = this.form.getRawValue();

    this.authService
      .register(rawValue.email, rawValue.username, rawValue.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          this.errorMessage = error.code;
        },
      });
  }

  getErrorMessage(control: FormControl): string {
    return getErrorMessage(control);
  }
}
