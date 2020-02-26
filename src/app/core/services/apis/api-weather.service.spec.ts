/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiWeatherService } from './api-weather.service';

describe('Service: ApiWeather', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiWeatherService]
    });
  });

  it('should ...', inject([ApiWeatherService], (service: ApiWeatherService) => {
    expect(service).toBeTruthy();
  }));
});
