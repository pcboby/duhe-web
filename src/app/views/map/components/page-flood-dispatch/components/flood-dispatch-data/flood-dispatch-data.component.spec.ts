/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FloodDispatchDataComponent } from './flood-dispatch-data.component';

describe('FloodDispatchDataComponent', () => {
  let component: FloodDispatchDataComponent;
  let fixture: ComponentFixture<FloodDispatchDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodDispatchDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodDispatchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
