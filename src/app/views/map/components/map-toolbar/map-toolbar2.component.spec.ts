/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapToolbar2Component } from './map-toolbar2.component';

describe('MapToolbar2Component', () => {
  let component: MapToolbar2Component;
  let fixture: ComponentFixture<MapToolbar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapToolbar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapToolbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
