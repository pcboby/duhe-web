/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasicToolService } from './basic-tool.service';

describe('Service: BasicTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicToolService]
    });
  });

  it('should ...', inject([BasicToolService], (service: BasicToolService) => {
    expect(service).toBeTruthy();
  }));
});
