/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogMapMiniHydropowerComponent } from './dialog-map-mini-hydropower.component';

describe('DialogMapMiniHydropowerComponent', () => {
  let component: DialogMapMiniHydropowerComponent;
  let fixture: ComponentFixture<DialogMapMiniHydropowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMapMiniHydropowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMapMiniHydropowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
