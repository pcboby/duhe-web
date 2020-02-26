/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiPredictionService } from './api-prediction.service';

describe('Service: ApiPrediction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiPredictionService]
    });
  });

  it('should ...', inject([ApiPredictionService], (service: ApiPredictionService) => {
    expect(service).toBeTruthy();
  }));
});
