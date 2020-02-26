/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArkwebService } from './arkweb.service';

describe('Service: Arkweb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArkwebService]
    });
  });

  it('should ...', inject([ArkwebService], (service: ArkwebService) => {
    expect(service).toBeTruthy();
  }));
});
