/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageForecastResultManagementChartComponent } from './page-forecast-result-management-chart.component';

describe('PageForecastResultManagementChartComponent', () => {
  let component: PageForecastResultManagementChartComponent;
  let fixture: ComponentFixture<PageForecastResultManagementChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageForecastResultManagementChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForecastResultManagementChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
