/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageSimulatedResultsManagementGrid2Component } from './page-simulated-results-management-grid2.component';

describe('PageSimulatedResultsManagementGrid2Component', () => {
  let component: PageSimulatedResultsManagementGrid2Component;
  let fixture: ComponentFixture<PageSimulatedResultsManagementGrid2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSimulatedResultsManagementGrid2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSimulatedResultsManagementGrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
