/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRealtimeJobPredictionFloodChart2Component } from './page-realtime-job-prediction-flood-chart2.component';

describe('PageRealtimeJobPredictionFloodChart2Component', () => {
  let component: PageRealtimeJobPredictionFloodChart2Component;
  let fixture: ComponentFixture<PageRealtimeJobPredictionFloodChart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRealtimeJobPredictionFloodChart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRealtimeJobPredictionFloodChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
