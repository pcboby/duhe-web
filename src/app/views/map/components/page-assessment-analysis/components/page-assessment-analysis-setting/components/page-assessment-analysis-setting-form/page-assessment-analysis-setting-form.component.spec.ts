/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageAssessmentAnalysisSettingFormComponent } from './page-assessment-analysis-setting-form.component';

describe('PageAssessmentAnalysisSettingFormComponent', () => {
  let component: PageAssessmentAnalysisSettingFormComponent;
  let fixture: ComponentFixture<PageAssessmentAnalysisSettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAssessmentAnalysisSettingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAssessmentAnalysisSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
