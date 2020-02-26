/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FloodAnalysisService } from './flood-analysis.service';

describe('Service: FloodAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloodAnalysisService]
    });
  });

  it('should ...', inject([FloodAnalysisService], (service: FloodAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
