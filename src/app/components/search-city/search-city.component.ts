import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { City } from '../../interfaces/city';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { CityService } from '../../services/city/city.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
  providers: [CityService],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgIf,
    MatIconModule,
    NgFor,
    MatOptionModule,
    MatProgressBarModule,
  ],
})
export class SearchCityComponent implements OnInit, OnDestroy {
  citySearchControl: FormControl = new FormControl('');
  loading: boolean = false;
  searchCityOptions: City[] = [];
  @Output() addCity: EventEmitter<City> = new EventEmitter<City>();

  private readonly destroy: Subject<void> = new Subject<void>();

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.citySearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((_) => (this.searchCityOptions = [])),
        filter((value) => value?.length > 2),
        mergeMap((value: string) => {
          this.loading = true;
          return this.cityService.getCities(value);
        }),
        filter((cities: City[]) => {
          this.loading = false;
          return cities.length > 0;
        }),
        map((cities: City[]) => cities.filter((city: City) => city?.name)),
        takeUntil(this.destroy),
      )
      .subscribe((cities: City[]): void => {
        this.searchCityOptions = cities;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  selectCity(): void {
    if (this.loading || !this.searchCityOptions.length) {
      return;
    }
    this.addCity.emit(this.searchCityOptions[0]);
    this.resetSearchControl();
  }

  resetSearchControl(): void {
    this.citySearchControl.reset();
  }
}
