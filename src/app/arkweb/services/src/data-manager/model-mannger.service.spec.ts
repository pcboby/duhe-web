/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModelMangerService } from './model-mannger.service';

describe('Service: ModelManger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelMangerService]
    });
  });

  it('should ...', inject([ModelMangerService], (service: ModelMangerService) => {
    expect(service).toBeTruthy();
  }));
});
