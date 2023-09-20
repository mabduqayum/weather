import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Weather } from '../../interfaces/weather';
import { City } from '../../interfaces/city';

@Injectable()
export class WeatherService {
  private cache: Map<string, Weather> = new Map();
  private readonly presets: string[] = ['current', 'minutely', 'hourly', 'daily'];

  constructor(private http: HttpClient) {}

  getWeather(city: City, preset: string): Observable<Weather> {
    const cacheKey = `${city.lat}-${city.lon}-${preset}`;
    const cachedWeather = this.cache.get(cacheKey);
    if (cachedWeather) {
      return of(cachedWeather);
    }

    const excludedPresets: string = this.presets
      .filter((option: string) => option != preset)
      .join(',');
    return this.http
      .get<Weather>(
        `${environment.weatherAPI}?lat=${city.lat}&lon=${city.lon}&exclude=${excludedPresets},alerts&units=metric&appid=${environment.apiKey}`,
      )
      .pipe(
        mergeMap((weather: Weather) => {
          if (preset === 'hourly') {
            weather.hourly = weather.hourly!.filter((_, i: number) => i < 24 && i % 3 === 0);
          } else {
            weather.daily = weather.daily!.slice(0, 7);
          }
          this.cache.set(cacheKey, weather);
          return of(weather);
        }),
      );
  }

  getWeathers(cities: City[], preset: string): Observable<Weather[]> {
    return forkJoin(
      cities.map((city: City) => {
        return this.getWeather(city, preset);
      }),
    );
  }
}
