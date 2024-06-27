import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../authentication/auth/auth.service';
import { SnackbarService } from '../snackbar/service/snackbar.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgIf,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string | null = null;
  private snackbarService = inject(SnackbarService);

  logOut() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
        this.snackbarService.show(
          'You have been succesfully logout form service',
          'notifications'
        );
      },
      error: (error) => {
        this.errorMessage = error.code;
      },
    });
  }
  opened: boolean = false;
}
