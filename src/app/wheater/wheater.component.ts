import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { WheaterSerivceService } from './wheater-serivce.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-wheater',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './wheater.component.html',
  styleUrl: './wheater.component.scss',
})
export class WheaterComponent implements OnInit, OnChanges {
  weather: any;
  lat: number = 0;
  lon: number = 0;
  forecast: any;
  iconURL: string = '';

  @Input() location: any;
  @Input({ required: true }) date: string = '';

  constructor(private weatherService: WheaterSerivceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && changes['date']) {
      this.getWeather();
    }
  }

  ngOnInit(): void {}

  getWeather() {
    if (this.date && this.location) {
      const targetDate = new Date(this.date);
      const targetDateString = targetDate.toDateString();

      this.weatherService.getWeather(this.location).subscribe(
        (data) => {
          console.log(data);

          this.weather = data;
          this.forecast = this.weather.daily.find((day: any) => {
            const dayDate = new Date(day.dt * 1000);

            return dayDate.toDateString() === targetDateString;
          });

          this.iconURL =
            'https://openweathermap.org/img/wn/' +
            this.forecast.weather[0].icon +
            '@2x.png';
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
