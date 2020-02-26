/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageHistorySchedulingSchemeGrid1Component } from './page-history-scheduling-scheme-grid1.component';

describe('PageHistorySchedulingSchemeGrid1Component', () => {
  let component: PageHistorySchedulingSchemeGrid1Component;
  let fixture: ComponentFixture<PageHistorySchedulingSchemeGrid1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHistorySchedulingSchemeGrid1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistorySchedulingSchemeGrid1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
