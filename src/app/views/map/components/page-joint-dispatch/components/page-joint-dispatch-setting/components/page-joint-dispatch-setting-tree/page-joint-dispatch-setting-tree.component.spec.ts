/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageJointDispatchSettingTreeComponent } from './page-joint-dispatch-setting-tree.component';

describe('PageJointDispatchSettingTreeComponent', () => {
  let component: PageJointDispatchSettingTreeComponent;
  let fixture: ComponentFixture<PageJointDispatchSettingTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJointDispatchSettingTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJointDispatchSettingTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
