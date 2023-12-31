import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { City } from '../../interfaces/city';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CityService {
  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
  ) {}

  getCities(cityName: string): Observable<City[]> {
    let cityAPI: string = `${environment.cityAPI}?q=${cityName}&limit=5&units=metric&appid=${environment.apiKey}`;
    return this.http.get<City[]>(cityAPI).pipe(
      tap((cities: City[]): void => {
        if (cities.length === 0) {
          this.matSnackBar.open(`City ${cityName} not found`, 'Close', {
            duration: 3000,
          });
        }
      }),
    );
  }
}
