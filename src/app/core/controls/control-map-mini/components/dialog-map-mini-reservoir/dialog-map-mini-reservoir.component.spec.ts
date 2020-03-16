/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogMapMiniReservoirComponent } from './dialog-map-mini-reservoir.component';

describe('DialogMapMiniReservoirComponent', () => {
  let component: DialogMapMiniReservoirComponent;
  let fixture: ComponentFixture<DialogMapMiniReservoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMapMiniReservoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMapMiniReservoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
