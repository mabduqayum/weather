import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Daily, Hourly, Weather} from "./interfaces/weather";
import {FormControl} from "@angular/forms";
import {City} from "./interfaces/city";
import {filter, mergeMap, Subject, takeUntil} from "rxjs";
import {WeatherService} from "./services/weather.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeatherService],
})
export class AppComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Weather> = new MatTableDataSource();
  displayedColumns: string[] = []
  citySearchControl: FormControl = new FormControl('');
  loading: boolean = true;
  timeOptions: string[] = ['hourly', 'daily'];
  timeOptionsControl: FormControl = new FormControl('hourly');
  private cities: City[] = []
  private readonly destroy: Subject<void> = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private matSnackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.loading = false;
    this.citySearchControl.setValue('Moscow')
    this.addCity()
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  addCity(): void {
    const city: string | null = this.citySearchControl.value;
    if (!city) {
      return
    }
    this.loading = true;
    this.weatherService.getCities(city)
      .pipe(
        filter((cities: City[]): boolean => {
          if (cities.length === 0) {
            this.matSnackBar.open(`City ${city} not found`, 'Close', {
              duration: 3000,
            });
            this.loading = false;
          }
          this.cdRef.detectChanges();
          return cities.length > 0;
        }),
        mergeMap((cities: City[]) => {
          this.cities.push(cities[0])
          return this.weatherService.getWeather(cities[0], this.timeOptionsControl.value)
        }),
        takeUntil(this.destroy)
      ).subscribe((weather: Weather): void => {
        this.setWeather(weather)
      }
    );
  }

  clearCitySearchControl(): void {
    this.citySearchControl.reset()
  }

  changeTimeOption(evt: Event): void {
    this.loading = true;
    this.displayedColumns.length = 0;
    this.dataSource.data.length = 0;
    this.weatherService.getWeathersByCities(this.cities, `${evt}`)
      .subscribe((weathers: Weather[]): void => {
        weathers.forEach((weather: Weather): void => {
          this.setWeather(weather);
        });
      });
  }

  private setDisplayedColumns(weather: Weather): void {
    this.displayedColumns = ['city_name'];
    if (this.timeOptionsControl.value === 'hourly') {
      weather.hourly!.forEach((hour: Hourly): void => {
        this.displayedColumns.push(`${hour.dt * 1000}`);
      })
    } else {
      weather.daily!.forEach((day: Daily): void => {
        this.displayedColumns.push(`${day.dt * 1000}`);
      })
    }
    this.cdRef.detectChanges();
  }

  private setWeather(weather: Weather): void {
    this.setDisplayedColumns(weather)
    this.dataSource.data = [...this.dataSource.data, weather];
    this.citySearchControl.reset();
    this.loading = false;
    this.cdRef.detectChanges();
  }
}
