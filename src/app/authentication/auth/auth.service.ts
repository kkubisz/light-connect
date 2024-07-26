import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';

import { Observable, from } from 'rxjs';
import { UserInteraface } from '../login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);

  currentUserSig = signal<UserInteraface | null | undefined>(undefined);

  register(
    email: string,
    username: string,
    passowrd: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      passowrd
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<string | null> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((UserCredential) => {
      return UserCredential.user.displayName || null;
    });

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {});

    return from(promise);
  }

  isLoggedIn(): boolean {
    return !!this.firebaseAuth.currentUser;
  }

  getUser(): Observable<any> {
    return user(this.firebaseAuth);
  }
}
