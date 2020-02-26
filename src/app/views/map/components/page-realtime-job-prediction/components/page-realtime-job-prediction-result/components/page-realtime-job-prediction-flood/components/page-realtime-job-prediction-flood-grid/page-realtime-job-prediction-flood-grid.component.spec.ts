/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRealtimeJobPredictionFloodGridComponent } from './page-realtime-job-prediction-flood-grid.component';

describe('PageRealtimeJobPredictionFloodGridComponent', () => {
  let component: PageRealtimeJobPredictionFloodGridComponent;
  let fixture: ComponentFixture<PageRealtimeJobPredictionFloodGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRealtimeJobPredictionFloodGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRealtimeJobPredictionFloodGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
