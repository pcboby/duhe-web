/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawTwinkleCircleService } from './draw-twinkclecircle.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawTwinkleCircleService]
    });
  });

  it('should ...', inject([DrawTwinkleCircleService], (service: DrawTwinkleCircleService) => {
    expect(service).toBeTruthy();
  }));
});
