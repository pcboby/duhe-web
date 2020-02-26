/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeatmapMangerService } from './heatmap-mannger.service';

describe('Service: FloodAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeatmapMangerService]
    });
  });

  it('should ...', inject([HeatmapMangerService], (service: HeatmapMangerService) => {
    expect(service).toBeTruthy();
  }));
});
