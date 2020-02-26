/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageJointSchedulingSchemeFormComponent } from './page-joint-scheduling-scheme-form.component';

describe('PageJointSchedulingSchemeFormComponent', () => {
  let component: PageJointSchedulingSchemeFormComponent;
  let fixture: ComponentFixture<PageJointSchedulingSchemeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJointSchedulingSchemeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJointSchedulingSchemeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
