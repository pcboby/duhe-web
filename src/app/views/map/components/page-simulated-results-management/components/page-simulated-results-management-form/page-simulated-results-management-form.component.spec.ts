/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageSimulatedResultsManagementFormComponent } from './page-simulated-results-management-form.component';

describe('PageSimulatedResultsManagementFormComponent', () => {
  let component: PageSimulatedResultsManagementFormComponent;
  let fixture: ComponentFixture<PageSimulatedResultsManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSimulatedResultsManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSimulatedResultsManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
