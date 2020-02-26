/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRealtimeJobPredictionRecommendChartComponent } from './page-realtime-job-prediction-recommend-chart.component';

describe('PageRealtimeJobPredictionRecommendChartComponent', () => {
  let component: PageRealtimeJobPredictionRecommendChartComponent;
  let fixture: ComponentFixture<PageRealtimeJobPredictionRecommendChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRealtimeJobPredictionRecommendChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRealtimeJobPredictionRecommendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
