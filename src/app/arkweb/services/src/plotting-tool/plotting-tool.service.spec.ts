/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlottingToolService } from './plotting-tool.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlottingToolService]
    });
  });

  it('should ...', inject([PlottingToolService], (service: PlottingToolService) => {
    expect(service).toBeTruthy();
  }));
});
