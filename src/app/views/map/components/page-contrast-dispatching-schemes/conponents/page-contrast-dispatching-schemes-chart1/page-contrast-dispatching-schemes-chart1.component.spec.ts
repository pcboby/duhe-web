/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageContrastDispatchingSchemesChart1Component } from './page-contrast-dispatching-schemes-chart1.component';

describe('PageContrastDispatchingSchemesChart1Component', () => {
  let component: PageContrastDispatchingSchemesChart1Component;
  let fixture: ComponentFixture<PageContrastDispatchingSchemesChart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContrastDispatchingSchemesChart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContrastDispatchingSchemesChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
