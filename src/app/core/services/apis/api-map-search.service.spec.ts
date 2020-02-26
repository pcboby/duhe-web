/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiMapSearchService } from './api-map-search.service';

describe('Service: ApiMapSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMapSearchService]
    });
  });

  it('should ...', inject([ApiMapSearchService], (service: ApiMapSearchService) => {
    expect(service).toBeTruthy();
  }));
});
