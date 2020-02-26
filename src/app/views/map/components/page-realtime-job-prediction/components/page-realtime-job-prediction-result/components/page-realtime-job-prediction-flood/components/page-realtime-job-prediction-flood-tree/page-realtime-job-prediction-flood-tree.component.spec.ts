/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRealtimeJobPredictionFloodTreeComponent } from './page-realtime-job-prediction-flood-tree.component';

describe('PageRealtimeJobPredictionFloodTreeComponent', () => {
  let component: PageRealtimeJobPredictionFloodTreeComponent;
  let fixture: ComponentFixture<PageRealtimeJobPredictionFloodTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRealtimeJobPredictionFloodTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRealtimeJobPredictionFloodTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
