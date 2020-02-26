/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeasureService } from './measure.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasureService]
    });
  });

  it('should ...', inject([MeasureService], (service: MeasureService) => {
    expect(service).toBeTruthy();
  }));
});
