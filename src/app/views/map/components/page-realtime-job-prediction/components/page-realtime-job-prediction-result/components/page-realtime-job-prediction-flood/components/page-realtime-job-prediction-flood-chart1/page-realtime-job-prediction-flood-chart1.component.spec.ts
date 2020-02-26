/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRealtimeJobPredictionFloodChart1Component } from './page-realtime-job-prediction-flood-chart1.component';

describe('PageRealtimeJobPredictionFloodChart1Component', () => {
  let component: PageRealtimeJobPredictionFloodChart1Component;
  let fixture: ComponentFixture<PageRealtimeJobPredictionFloodChart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRealtimeJobPredictionFloodChart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRealtimeJobPredictionFloodChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
