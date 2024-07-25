import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../utlis/weather-type';
import { LatLang } from '../utlis/lat-lang-type';

@Injectable({
  providedIn: 'root',
})
export class WheaterSerivceService {
  private apiKey: string = 'b0454686b4c0f5459fed65be7ad96ae7';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/onecall';

  constructor(private http: HttpClient) {}

  getWeather(location: LatLang) {
    const url = `${this.apiUrl}?lat=${location.lat}&lon=${location.lng}&exclude=current,minutely,hourly,alerts&appid=${this.apiKey}&units=metric`;

    return this.http.get<WeatherData>(url);
  }
}
