/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageJointSchedulingSchemeGrid1Component } from './page-joint-scheduling-scheme-grid1.component';

describe('PageJointSchedulingSchemeGrid1Component', () => {
  let component: PageJointSchedulingSchemeGrid1Component;
  let fixture: ComponentFixture<PageJointSchedulingSchemeGrid1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJointSchedulingSchemeGrid1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJointSchedulingSchemeGrid1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
