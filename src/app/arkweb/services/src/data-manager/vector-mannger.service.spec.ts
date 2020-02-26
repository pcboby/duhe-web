/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VectorMangerService } from './vector-mannger.service';

describe('Service: FloodAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VectorMangerService]
    });
  });

  it('should ...', inject([VectorMangerService], (service: VectorMangerService) => {
    expect(service).toBeTruthy();
  }));
});
