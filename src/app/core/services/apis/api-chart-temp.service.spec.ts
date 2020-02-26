/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiChartTempService } from './api-chart-temp.service';

describe('Service: ApiChartTemp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiChartTempService]
    });
  });

  it('should ...', inject([ApiChartTempService], (service: ApiChartTempService) => {
    expect(service).toBeTruthy();
  }));
});
