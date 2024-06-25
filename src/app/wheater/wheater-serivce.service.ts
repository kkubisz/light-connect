import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WheaterSerivceService {
  private apiKey: string = 'b0454686b4c0f5459fed65be7ad96ae7';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/onecall';

  constructor(private http: HttpClient) {}

  getWeather(location: { lat: number; lng: number }) {
    console.log(location);

    const url = `${this.apiUrl}?lat=${location.lat}&lon=${location.lng}&exclude=current,minutely,hourly,alerts&appid=${this.apiKey}&units=metric`;
    console.log(url);

    return this.http.get<any>(url);
  }
}
