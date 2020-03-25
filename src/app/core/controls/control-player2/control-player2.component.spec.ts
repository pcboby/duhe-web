/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlPlayer2Component } from './control-player2.component';

describe('ControlPlayer2Component', () => {
  let component: ControlPlayer2Component;
  let fixture: ComponentFixture<ControlPlayer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPlayer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPlayer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
