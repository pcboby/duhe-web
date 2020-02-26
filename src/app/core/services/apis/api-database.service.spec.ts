/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiDatabaseService } from './api-database.service';

describe('Service: ApiDatabase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDatabaseService]
    });
  });

  it('should ...', inject([ApiDatabaseService], (service: ApiDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
