import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Daily, Hourly, Weather} from './interfaces/weather';
import {FormControl} from '@angular/forms';
import {City} from './interfaces/city';
import {Subject, takeUntil} from 'rxjs';
import {WeatherService} from './services/weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeatherService]
})
export class AppComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Weather> = new MatTableDataSource();
  displayedColumns: string[] = [];
  loading: boolean = true;
  preset: string[] = ['hourly', 'daily'];
  presetControl: FormControl = new FormControl('hourly');
  private cities: City[] = [];
  private readonly destroy: Subject<void> = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onAddCity(city: City) {
    this.loading = true;
    this.cities.push(city);
    this.weatherService.getWeather(city, this.presetControl.value)
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe((weather: Weather): void => {
          this.setWeather(weather);
        }
      );
  }


  changePresetOption(evt: Event): void {
    this.loading = true;
    this.displayedColumns.length = 0;
    this.dataSource.data.length = 0;
    this.weatherService.getWeathers(this.cities, `${evt}`)
      .subscribe((weathers: Weather[]): void => {
        weathers.forEach((weather: Weather): void => {
          this.setWeather(weather);
        });
      });
  }

  private setDisplayedColumns(weather: Weather): void {
    this.displayedColumns = ['city_name'];
    if (this.presetControl.value === 'hourly') {
      weather.hourly!.forEach((hour: Hourly): void => {
        this.displayedColumns.push(`${hour.dt * 1000}`);
      });
    } else {
      weather.daily!.forEach((day: Daily): void => {
        this.displayedColumns.push(`${day.dt * 1000}`);
      });
    }
    this.cdRef.detectChanges();
  }

  private setWeather(weather: Weather): void {
    this.setDisplayedColumns(weather);
    this.dataSource.data = [...this.dataSource.data, weather];
    this.loading = false;
    this.cdRef.detectChanges();
  }
}
