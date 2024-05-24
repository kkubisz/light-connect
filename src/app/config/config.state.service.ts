import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigStateService {
  taskListView = signal<number>(new Date().getFullYear());
}
