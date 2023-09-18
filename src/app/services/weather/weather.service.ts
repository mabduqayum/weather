import {Injectable} from '@angular/core';
import {forkJoin, mergeMap, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Weather} from '../../interfaces/weather';
import {City} from '../../interfaces/city';

@Injectable()
export class WeatherService {
  private readonly timeOptions: string[] = ['current', 'minutely', 'hourly', 'daily']

  constructor(private http: HttpClient) {
  }

  getWeather(city: City, preset: string): Observable<Weather> {
    const excludeOptions: string = this.timeOptions.filter((option: string) => option != preset).join(',')
    return this.http.get<Weather>(
      `${environment.weatherAPI}?lat=${city.lat}&lon=${city.lon}&exclude=${excludeOptions},alerts&units=metric&appid=${environment.apiKey}`
    ).pipe(mergeMap((weather: Weather) => {
      if (preset === 'hourly') {
        weather.hourly = weather.hourly!.filter((_, index: number) => {
          return index < 24 && index % 3 === 0;
        });
      }
      return of(weather)
    }));
  }

  getWeathers(cities: City[], preset: string): Observable<Weather[]> {
    return forkJoin(cities.map((city: City) => {
        return this.getWeather(city, preset);
      }
    ));
  }
}
