/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HydrologicalForecastConfigGridComponent } from './hydrological-forecast-config-grid.component';

describe('HydrologicalForecastConfigGridComponent', () => {
  let component: HydrologicalForecastConfigGridComponent;
  let fixture: ComponentFixture<HydrologicalForecastConfigGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrologicalForecastConfigGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrologicalForecastConfigGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
