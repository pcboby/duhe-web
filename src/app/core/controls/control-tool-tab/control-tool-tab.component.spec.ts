/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlToolTabComponent } from './control-tool-tab.component';

describe('ControlToolTabComponent', () => {
  let component: ControlToolTabComponent;
  let fixture: ComponentFixture<ControlToolTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlToolTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlToolTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
