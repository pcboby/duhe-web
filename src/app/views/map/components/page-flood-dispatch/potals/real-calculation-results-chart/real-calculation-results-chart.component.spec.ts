/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RealCalculationResultsChartComponent } from './real-calculation-results-chart.component';

describe('RealCalculationResultsChartComponent', () => {
  let component: RealCalculationResultsChartComponent;
  let fixture: ComponentFixture<RealCalculationResultsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealCalculationResultsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealCalculationResultsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
