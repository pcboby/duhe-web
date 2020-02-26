/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageFloodSimulationSettingGridComponent } from './page-flood-simulation-setting-grid.component';

describe('PageFloodSimulationSettingGridComponent', () => {
  let component: PageFloodSimulationSettingGridComponent;
  let fixture: ComponentFixture<PageFloodSimulationSettingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFloodSimulationSettingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFloodSimulationSettingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
