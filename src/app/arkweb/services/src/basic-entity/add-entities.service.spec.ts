/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntityToolService } from './add-entities.service';

describe('Service: FloodAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityToolService]
    });
  });

  it('should ...', inject([EntityToolService], (service: EntityToolService) => {
    expect(service).toBeTruthy();
  }));
});
