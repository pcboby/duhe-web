/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageAssessmentAnalysisSettingTreeComponent } from './page-assessment-analysis-setting-tree.component';

describe('PageAssessmentAnalysisSettingTreeComponent', () => {
  let component: PageAssessmentAnalysisSettingTreeComponent;
  let fixture: ComponentFixture<PageAssessmentAnalysisSettingTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAssessmentAnalysisSettingTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAssessmentAnalysisSettingTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
