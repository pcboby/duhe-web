/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FloodDispatchContrastComponent } from './flood-dispatch-contrast.component';

describe('FloodDispatchContrastComponent', () => {
  let component: FloodDispatchContrastComponent;
  let fixture: ComponentFixture<FloodDispatchContrastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodDispatchContrastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodDispatchContrastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
