/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HydrologicalForecastConfigFormComponent } from './hydrological-forecast-config-form.component';

describe('HydrologicalForecastConfigFormComponent', () => {
  let component: HydrologicalForecastConfigFormComponent;
  let fixture: ComponentFixture<HydrologicalForecastConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrologicalForecastConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrologicalForecastConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
