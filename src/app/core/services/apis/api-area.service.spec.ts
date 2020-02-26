/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiAreaService } from './api-area.service';

describe('Service: ApiArea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiAreaService]
    });
  });

  it('should ...', inject([ApiAreaService], (service: ApiAreaService) => {
    expect(service).toBeTruthy();
  }));
});
