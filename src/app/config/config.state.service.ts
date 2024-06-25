import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigStateService {
  selectedYear = signal<number>(new Date().getFullYear());
}
