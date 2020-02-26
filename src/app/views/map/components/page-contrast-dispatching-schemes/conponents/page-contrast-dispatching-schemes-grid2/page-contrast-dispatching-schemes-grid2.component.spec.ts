/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageContrastDispatchingSchemesGrid2Component } from './page-contrast-dispatching-schemes-grid2.component';

describe('PageContrastDispatchingSchemesGrid2Component', () => {
  let component: PageContrastDispatchingSchemesGrid2Component;
  let fixture: ComponentFixture<PageContrastDispatchingSchemesGrid2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContrastDispatchingSchemesGrid2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContrastDispatchingSchemesGrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
