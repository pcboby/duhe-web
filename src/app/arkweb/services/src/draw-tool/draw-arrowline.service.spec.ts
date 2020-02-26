/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawArrowService } from './draw-arrowline.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawArrowService]
    });
  });

  it('should ...', inject([DrawArrowService], (service: DrawArrowService) => {
    expect(service).toBeTruthy();
  }));
});
