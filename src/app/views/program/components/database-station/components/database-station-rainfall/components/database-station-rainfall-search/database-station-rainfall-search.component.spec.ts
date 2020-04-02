/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatabaseStationRainfallSearchComponent } from './database-station-rainfall-search.component';

describe('DatabaseStationRainfallSearchComponent', () => {
  let component: DatabaseStationRainfallSearchComponent;
  let fixture: ComponentFixture<DatabaseStationRainfallSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseStationRainfallSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseStationRainfallSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
