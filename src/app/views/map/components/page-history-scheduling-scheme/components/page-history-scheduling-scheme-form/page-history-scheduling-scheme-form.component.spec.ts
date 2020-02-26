/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageHistorySchedulingSchemeFormComponent } from './page-history-scheduling-scheme-form.component';

describe('PageHistorySchedulingSchemeFormComponent', () => {
  let component: PageHistorySchedulingSchemeFormComponent;
  let fixture: ComponentFixture<PageHistorySchedulingSchemeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHistorySchedulingSchemeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistorySchedulingSchemeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
