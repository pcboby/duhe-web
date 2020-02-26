/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TooltipService } from './tooltip.service';

describe('Service: Tooltip', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TooltipService]
    });
  });

  it('should ...', inject([TooltipService], (service: TooltipService) => {
    expect(service).toBeTruthy();
  }));
});
