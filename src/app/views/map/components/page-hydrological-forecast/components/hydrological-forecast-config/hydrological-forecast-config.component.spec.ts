/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HydrologicalForecastConfigComponent } from './hydrological-forecast-config.component';

describe('HydrologicalForecastConfigComponent', () => {
  let component: HydrologicalForecastConfigComponent;
  let fixture: ComponentFixture<HydrologicalForecastConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrologicalForecastConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrologicalForecastConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
