/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisualService } from './visual.service';

describe('Service: Visual', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualService]
    });
  });

  it('should ...', inject([VisualService], (service: VisualService) => {
    expect(service).toBeTruthy();
  }));
});
