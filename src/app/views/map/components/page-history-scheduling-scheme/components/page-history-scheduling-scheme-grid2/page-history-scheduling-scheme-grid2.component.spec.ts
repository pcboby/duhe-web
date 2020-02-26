/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageHistorySchedulingSchemeGrid2Component } from './page-history-scheduling-scheme-grid2.component';

describe('PageHistorySchedulingSchemeGrid2Component', () => {
  let component: PageHistorySchedulingSchemeGrid2Component;
  let fixture: ComponentFixture<PageHistorySchedulingSchemeGrid2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHistorySchedulingSchemeGrid2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistorySchedulingSchemeGrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
