/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TerrainClippingService } from './terrain-clipping.service';

describe('Service: TerrainClipping', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerrainClippingService]
    });
  });

  it('should ...', inject([TerrainClippingService], (service: TerrainClippingService) => {
    expect(service).toBeTruthy();
  }));
});
