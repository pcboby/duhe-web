/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageContrastDispatchingSchemesChart2Component } from './page-contrast-dispatching-schemes-chart2.component';

describe('PageContrastDispatchingSchemesChart2Component', () => {
  let component: PageContrastDispatchingSchemesChart2Component;
  let fixture: ComponentFixture<PageContrastDispatchingSchemesChart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContrastDispatchingSchemesChart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContrastDispatchingSchemesChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
