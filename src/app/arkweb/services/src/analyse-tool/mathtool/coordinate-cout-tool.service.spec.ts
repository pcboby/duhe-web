/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoordinateCoutToolService } from './coordinate-cout-tool.service';

describe('Service: CoordinateCoutTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinateCoutToolService]
    });
  });

  it('should ...', inject([CoordinateCoutToolService], (service: CoordinateCoutToolService) => {
    expect(service).toBeTruthy();
  }));
});
