/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageContrastDispatchingSchemesGrid1Component } from './page-contrast-dispatching-schemes-grid1.component';

describe('PageContrastDispatchingSchemesGrid1Component', () => {
  let component: PageContrastDispatchingSchemesGrid1Component;
  let fixture: ComponentFixture<PageContrastDispatchingSchemesGrid1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContrastDispatchingSchemesGrid1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContrastDispatchingSchemesGrid1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
