/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SlopToolService } from './slop-tool.service';

describe('Service: SectionTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlopToolService]
    });
  });

  it('should ...', inject([SlopToolService], (service: SlopToolService) => {
    expect(service).toBeTruthy();
  }));
});
