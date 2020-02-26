/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArkwebSwitchToComponent } from './arkweb-switch-to.component';

describe('ArkwebSwitchToComponent', () => {
  let component: ArkwebSwitchToComponent;
  let fixture: ComponentFixture<ArkwebSwitchToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArkwebSwitchToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkwebSwitchToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
