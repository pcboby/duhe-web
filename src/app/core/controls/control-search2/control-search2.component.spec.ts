/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlSearch2Component } from './control-search2.component';

describe('ControlSearch2Component', () => {
  let component: ControlSearch2Component;
  let fixture: ComponentFixture<ControlSearch2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlSearch2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSearch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
