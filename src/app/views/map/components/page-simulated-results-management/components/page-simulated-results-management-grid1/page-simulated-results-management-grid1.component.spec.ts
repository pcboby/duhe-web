/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageSimulatedResultsManagementGrid1Component } from './page-simulated-results-management-grid1.component';

describe('PageSimulatedResultsManagementGrid1Component', () => {
  let component: PageSimulatedResultsManagementGrid1Component;
  let fixture: ComponentFixture<PageSimulatedResultsManagementGrid1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSimulatedResultsManagementGrid1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSimulatedResultsManagementGrid1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
