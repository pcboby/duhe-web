/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArkwebComponent } from './arkweb.component';

describe('ArkwebComponent', () => {
  let component: ArkwebComponent;
  let fixture: ComponentFixture<ArkwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArkwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
