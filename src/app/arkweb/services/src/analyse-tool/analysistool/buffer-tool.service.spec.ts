/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BufferToolService } from './buffer-tool.service';

describe('Service: BufferTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BufferToolService]
    });
  });

  it('should ...', inject([BufferToolService], (service: BufferToolService) => {
    expect(service).toBeTruthy();
  }));
});
