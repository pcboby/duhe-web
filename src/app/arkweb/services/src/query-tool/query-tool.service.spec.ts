/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueryToolService } from './query-tool.service';

describe('Service: Measure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryToolService]
    });
  });

  it('should ...', inject([QueryToolService], (service: QueryToolService) => {
    expect(service).toBeTruthy();
  }));
});
