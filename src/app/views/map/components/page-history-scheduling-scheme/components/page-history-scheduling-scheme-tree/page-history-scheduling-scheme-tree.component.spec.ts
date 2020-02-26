/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageHistorySchedulingSchemeTreeComponent } from './page-history-scheduling-scheme-tree.component';

describe('PageHistorySchedulingSchemeTreeComponent', () => {
  let component: PageHistorySchedulingSchemeTreeComponent;
  let fixture: ComponentFixture<PageHistorySchedulingSchemeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHistorySchedulingSchemeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistorySchedulingSchemeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
