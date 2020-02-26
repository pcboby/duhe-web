/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawWaterService } from './draw-polygon.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawWaterService]
    });
  });

  it('should ...', inject([DrawWaterService], (service: DrawWaterService) => {
    expect(service).toBeTruthy();
  }));
});
