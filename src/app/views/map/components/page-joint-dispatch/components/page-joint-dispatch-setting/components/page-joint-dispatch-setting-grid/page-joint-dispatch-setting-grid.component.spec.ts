/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageJointDispatchSettingGridComponent } from './page-joint-dispatch-setting-grid.component';

describe('PageJointDispatchSettingGridComponent', () => {
  let component: PageJointDispatchSettingGridComponent;
  let fixture: ComponentFixture<PageJointDispatchSettingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJointDispatchSettingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJointDispatchSettingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
