/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageJointDispatchSettingMapComponent } from './page-joint-dispatch-setting-map.component';

describe('PageJointDispatchSettingMapComponent', () => {
  let component: PageJointDispatchSettingMapComponent;
  let fixture: ComponentFixture<PageJointDispatchSettingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJointDispatchSettingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJointDispatchSettingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
