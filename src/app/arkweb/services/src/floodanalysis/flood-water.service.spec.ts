/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FloodWaterService } from './flood-water.service';

describe('Service: FloodAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloodWaterService]
    });
  });

  it('should ...', inject([FloodWaterService], (service: FloodWaterService) => {
    expect(service).toBeTruthy();
  }));
});
