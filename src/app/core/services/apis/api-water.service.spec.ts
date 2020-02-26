/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiWaterService } from './api-water.service';

describe('Service: ApiWater', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiWaterService]
    });
  });

  it('should ...', inject([ApiWaterService], (service: ApiWaterService) => {
    expect(service).toBeTruthy();
  }));
});
