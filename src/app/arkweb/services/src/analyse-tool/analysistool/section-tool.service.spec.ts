/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SectionToolService } from './section-tool.service';

describe('Service: SectionTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectionToolService]
    });
  });

  it('should ...', inject([SectionToolService], (service: SectionToolService) => {
    expect(service).toBeTruthy();
  }));
});
