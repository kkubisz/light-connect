// Interfejsy dla obiektu weather
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Interfejs dla obiektu temp
interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

// Interfejs dla obiektu feels_like
interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

// Interfejs dla obiektu daily
export type WeatherDaily = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number; // pole opcjonalne
};

// Główny interfejs dla obiektu z danymi pogodowymi
export type WeatherData = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: WeatherDaily[];
};
