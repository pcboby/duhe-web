/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRealtimeJobPredictionRecommendComponent } from './page-realtime-job-prediction-recommend.component';

describe('PageRealtimeJobPredictionRecommendComponent', () => {
  let component: PageRealtimeJobPredictionRecommendComponent;
  let fixture: ComponentFixture<PageRealtimeJobPredictionRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRealtimeJobPredictionRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRealtimeJobPredictionRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
