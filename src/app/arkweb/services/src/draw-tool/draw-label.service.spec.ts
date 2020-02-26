/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawLabelService } from './draw-label.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawLabelService]
    });
  });

  it('should ...', inject([DrawLabelService], (service: DrawLabelService) => {
    expect(service).toBeTruthy();
  }));
});
