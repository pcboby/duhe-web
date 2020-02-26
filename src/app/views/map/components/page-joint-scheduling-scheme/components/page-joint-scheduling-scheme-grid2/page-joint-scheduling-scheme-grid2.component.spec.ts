/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageJointSchedulingSchemeGrid2Component } from './page-joint-scheduling-scheme-grid2.component';

describe('PageJointSchedulingSchemeGrid2Component', () => {
  let component: PageJointSchedulingSchemeGrid2Component;
  let fixture: ComponentFixture<PageJointSchedulingSchemeGrid2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJointSchedulingSchemeGrid2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJointSchedulingSchemeGrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
