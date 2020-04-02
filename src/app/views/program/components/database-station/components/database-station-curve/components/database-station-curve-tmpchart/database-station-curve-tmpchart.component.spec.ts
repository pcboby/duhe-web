/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatabaseStationCurveTmpchartComponent } from './database-station-curve-tmpchart.component';

describe('DatabaseStationCurveTmpchartComponent', () => {
  let component: DatabaseStationCurveTmpchartComponent;
  let fixture: ComponentFixture<DatabaseStationCurveTmpchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseStationCurveTmpchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseStationCurveTmpchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
