/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawPolylineService } from './draw-polygon.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawPolylineService]
    });
  });

  it('should ...', inject([DrawPolylineService], (service: DrawPolylineService) => {
    expect(service).toBeTruthy();
  }));
});
