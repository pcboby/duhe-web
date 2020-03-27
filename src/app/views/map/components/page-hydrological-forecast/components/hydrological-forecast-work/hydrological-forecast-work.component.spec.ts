/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HydrologicalForecastWorkComponent } from './hydrological-forecast-work.component';

describe('HydrologicalForecastWorkComponent', () => {
  let component: HydrologicalForecastWorkComponent;
  let fixture: ComponentFixture<HydrologicalForecastWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrologicalForecastWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrologicalForecastWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
