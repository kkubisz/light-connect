import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

type SunrideData = {
  results: {
    date: string;
    sunrise: string;
    sunset: string;
    first_light: string;
    last_light: string;
    dawn: string;
    dusk: string;
    solar_noon: string;
    golden_hour: string;
    day_length: string;
    timezone: string;
    utc_offset: number;
  };
  status: string;
};
@Component({
  selector: 'app-sunrise-sunset',
  standalone: true,
  imports: [],
  templateUrl: './sunrise-sunset.component.html',
  styleUrl: './sunrise-sunset.component.scss',
})
export class SunriseSunsetComponent implements OnInit {
  private sunriseURL = 'https://api.sunrisesunset.io/';
  private http = inject(HttpClient);

  sunriseData: SunrideData = {} as SunrideData;

  @Input() location: any;
  @Input({ required: true }) date!: Timestamp;

  ngOnInit(): void {
    if (this.location && this.date) {
      const convertedDate = this.date.seconds * 1000;

      console.log(convertedDate);

      const formatedDate = new Date(convertedDate).toISOString().split('T')[0];
      const url = `${this.sunriseURL}json?lat=${this.location.lat}&lng=${this.location.lng}&timezone=CET&date=${formatedDate}`;
      this.http.get<SunrideData>(url).subscribe((data) => {
        if (data.status === 'OK') {
          this.sunriseData = data;
        }
      });
    }
  }
}
