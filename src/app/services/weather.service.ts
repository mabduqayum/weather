import {Injectable} from '@angular/core';
import {forkJoin, mergeMap, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Daily, Hourly, Weather} from '../interfaces/weather';
import {City} from '../interfaces/city';

@Injectable()
export class WeatherService {
  private readonly timeOptions: string[] = ['current', 'minutely', 'hourly', 'daily']

  constructor(private http: HttpClient) {
  }

  getWeather(city: City, timeOption: string): Observable<Weather> {
    const excludeOptions: string = this.timeOptions.filter((option: string) => option != timeOption).join(',')
    return this.http.get<Weather>(
      `${environment.weatherAPI}?lat=${city.lat}&lon=${city.lon}&exclude=${excludeOptions},alerts&units=metric&appid=${environment.apiKey}`
    ).pipe(mergeMap((weather: Weather) => {
      if (timeOption === 'hourly') {
        weather.hourly = weather.hourly!.filter((hourly: Hourly | Daily, index: number) => {
          return index < 24 && index % 3 === 0;
        });
      }
      return of(weather)
    }));
  }

  getCities(cityName: string): Observable<City[]> {
    let cityAPI: string = `${environment.cityAPI}?q=${cityName}&limit=1&units=metric&appid=${environment.apiKey}`;
    return this.http.get<City[]>(cityAPI);
  }

  getWeathersByCities(cities: City[], timeOption: string): Observable<Weather[]> {
    return forkJoin(cities.map((city: City) => {
        return this.getWeather(city, timeOption);
      }
    ));
  }
}
