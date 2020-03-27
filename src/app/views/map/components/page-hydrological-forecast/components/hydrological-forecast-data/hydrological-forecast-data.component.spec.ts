/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HydrologicalForecastDataComponent } from './hydrological-forecast-data.component';

describe('HydrologicalForecastDataComponent', () => {
  let component: HydrologicalForecastDataComponent;
  let fixture: ComponentFixture<HydrologicalForecastDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrologicalForecastDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrologicalForecastDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
