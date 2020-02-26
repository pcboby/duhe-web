/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageAssessmentAnalysisSettingComponent } from './page-assessment-analysis-setting.component';

describe('PageAssessmentAnalysisSettingComponent', () => {
  let component: PageAssessmentAnalysisSettingComponent;
  let fixture: ComponentFixture<PageAssessmentAnalysisSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAssessmentAnalysisSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAssessmentAnalysisSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
