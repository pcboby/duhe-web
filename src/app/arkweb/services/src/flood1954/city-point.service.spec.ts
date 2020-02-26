/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PointBillService } from './city-point.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointBillService]
    });
  });

  it('should ...', inject([PointBillService], (service: PointBillService) => {
    expect(service).toBeTruthy();
  }));
});
