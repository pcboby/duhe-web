/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiRiverService } from './api-river.service';

describe('Service: ApiRiver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRiverService]
    });
  });

  it('should ...', inject([ApiRiverService], (service: ApiRiverService) => {
    expect(service).toBeTruthy();
  }));
});
