/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GasProjectionToolService } from './gas-projection-tool.service';

describe('Service: GasProjectionTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GasProjectionToolService]
    });
  });

  it('should ...', inject([GasProjectionToolService], (service: GasProjectionToolService) => {
    expect(service).toBeTruthy();
  }));
});
