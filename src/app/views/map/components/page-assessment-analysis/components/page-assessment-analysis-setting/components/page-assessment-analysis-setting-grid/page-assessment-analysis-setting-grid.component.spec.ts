/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageAssessmentAnalysisSettingGridComponent } from './page-assessment-analysis-setting-grid.component';

describe('PageAssessmentAnalysisSettingGridComponent', () => {
  let component: PageAssessmentAnalysisSettingGridComponent;
  let fixture: ComponentFixture<PageAssessmentAnalysisSettingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAssessmentAnalysisSettingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAssessmentAnalysisSettingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
