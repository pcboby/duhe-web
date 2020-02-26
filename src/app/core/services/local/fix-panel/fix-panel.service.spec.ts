/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FixPanelService } from './fix-panel.service';

describe('Service: FixPanel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixPanelService]
    });
  });

  it('should ...', inject([FixPanelService], (service: FixPanelService) => {
    expect(service).toBeTruthy();
  }));
});
