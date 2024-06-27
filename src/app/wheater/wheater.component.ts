import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { WheaterSerivceService } from './wheater-serivce.service';
import { DecimalPipe } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-wheater',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './wheater.component.html',
  styleUrl: './wheater.component.scss',
})
export class WheaterComponent implements OnInit {
  weather: any;
  lat: number = 0;
  lon: number = 0;
  forecast: any;
  iconURL: string = '';
  private weatherService = inject(WheaterSerivceService);

  @Input({ required: true }) location!: any;
  @Input({ required: true }) date!: Timestamp;

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    if (this.date && this.location) {
      console.log('aaaa');

      const convertedDate = this.date.seconds * 1000;
      const targetDate = new Date(convertedDate);
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
