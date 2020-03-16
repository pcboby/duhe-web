/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogMapMiniHydrologicalComponent } from './dialog-map-mini-hydrological.component';

describe('DialogMapMiniHydrologicalComponent', () => {
  let component: DialogMapMiniHydrologicalComponent;
  let fixture: ComponentFixture<DialogMapMiniHydrologicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMapMiniHydrologicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMapMiniHydrologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
