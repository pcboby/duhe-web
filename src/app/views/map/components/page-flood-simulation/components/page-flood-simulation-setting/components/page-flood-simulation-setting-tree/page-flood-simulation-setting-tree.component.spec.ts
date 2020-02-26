/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageFloodSimulationSettingTreeComponent } from './page-flood-simulation-setting-tree.component';

describe('PageFloodSimulationSettingTreeComponent', () => {
  let component: PageFloodSimulationSettingTreeComponent;
  let fixture: ComponentFixture<PageFloodSimulationSettingTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFloodSimulationSettingTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFloodSimulationSettingTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
