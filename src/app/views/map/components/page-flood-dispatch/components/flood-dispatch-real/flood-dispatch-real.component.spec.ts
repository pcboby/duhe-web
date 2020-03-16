/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FloodDispatchRealComponent } from './flood-dispatch-real.component';

describe('FloodDispatchRealComponent', () => {
  let component: FloodDispatchRealComponent;
  let fixture: ComponentFixture<FloodDispatchRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodDispatchRealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodDispatchRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
