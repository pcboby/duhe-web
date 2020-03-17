/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RealCalculationResultsDashComponent } from './real-calculation-results-dash.component';

describe('RealCalculationResultsDashComponent', () => {
  let component: RealCalculationResultsDashComponent;
  let fixture: ComponentFixture<RealCalculationResultsDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealCalculationResultsDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealCalculationResultsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
