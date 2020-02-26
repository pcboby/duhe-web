/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpaceOverlayService } from './space-overlay.service';

describe('Service: BufferTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpaceOverlayService]
    });
  });

  it('should ...', inject([SpaceOverlayService], (service: SpaceOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
