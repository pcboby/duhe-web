/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Toolbar2Component } from './toolbar2.component';

describe('Toolbar2Component', () => {
  let component: Toolbar2Component;
  let fixture: ComponentFixture<Toolbar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Toolbar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Toolbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
