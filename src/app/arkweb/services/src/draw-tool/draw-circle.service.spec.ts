/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawCircleService } from './draw-circle.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawCircleService]
    });
  });

  it('should ...', inject([DrawCircleService], (service: DrawCircleService) => {
    expect(service).toBeTruthy();
  }));
});
