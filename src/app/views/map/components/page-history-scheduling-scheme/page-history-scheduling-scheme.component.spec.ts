/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageHistorySchedulingSchemeComponent } from './page-history-scheduling-scheme.component';

describe('PageHistorySchedulingSchemeComponent', () => {
  let component: PageHistorySchedulingSchemeComponent;
  let fixture: ComponentFixture<PageHistorySchedulingSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHistorySchedulingSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistorySchedulingSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
