/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRealtimeJobPredictionRecommendGridComponent } from './page-realtime-job-prediction-recommend-grid.component';

describe('PageRealtimeJobPredictionRecommendGridComponent', () => {
  let component: PageRealtimeJobPredictionRecommendGridComponent;
  let fixture: ComponentFixture<PageRealtimeJobPredictionRecommendGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRealtimeJobPredictionRecommendGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRealtimeJobPredictionRecommendGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
