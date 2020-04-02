/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatabaseStationCurveTmpgridComponent } from './database-station-curve-tmpgrid.component';

describe('DatabaseStationCurveTmpgridComponent', () => {
  let component: DatabaseStationCurveTmpgridComponent;
  let fixture: ComponentFixture<DatabaseStationCurveTmpgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseStationCurveTmpgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseStationCurveTmpgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
