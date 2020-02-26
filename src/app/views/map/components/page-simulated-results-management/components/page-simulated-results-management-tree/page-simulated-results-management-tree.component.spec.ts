/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageSimulatedResultsManagementTreeComponent } from './page-simulated-results-management-tree.component';

describe('PageSimulatedResultsManagementTreeComponent', () => {
  let component: PageSimulatedResultsManagementTreeComponent;
  let fixture: ComponentFixture<PageSimulatedResultsManagementTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSimulatedResultsManagementTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSimulatedResultsManagementTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
