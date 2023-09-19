import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { City } from '../../interfaces/city';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch weather data for a single city', () => {
    const mockCity = { lat: 40.7128, lon: -74.006 } as City;
    const mockResponse = { hourly: Array.from({ length: 48 }, (_, i) => i) };

    service.getWeather(mockCity, 'hourly').subscribe((weather) => {
      // Check if hourly data is filtered correctly.
      expect(weather.hourly).toEqual([0, 3, 6, 9, 12, 15, 18, 21] as any);
    });

    const req = httpTestingController.expectOne((request) =>
      request.url.includes(`${mockCity.lat}&lon=${mockCity.lon}`),
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should fetch weather data for multiple cities', () => {
    const mockCities = [
      { lat: 40.7128, lon: -74.006 },
      { lat: 34.0522, lon: -118.2437 },
    ] as City[];
    const mockResponses = [{}, {}];

    service.getWeathers(mockCities, 'daily').subscribe((weathers) => {
      expect(weathers.length).toBe(2);
    });

    const reqs = httpTestingController.match((request) => request.url.includes('lat'));
    expect(reqs.length).toBe(2);
    reqs[0].flush(mockResponses[0]);
    reqs[1].flush(mockResponses[1]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});


