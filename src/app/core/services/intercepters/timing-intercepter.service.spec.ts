/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimingIntercepterService } from './timing-intercepter.service';

describe('Service: TimingIntercepter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimingIntercepterService]
    });
  });

  it('should ...', inject([TimingIntercepterService], (service: TimingIntercepterService) => {
    expect(service).toBeTruthy();
  }));
});
