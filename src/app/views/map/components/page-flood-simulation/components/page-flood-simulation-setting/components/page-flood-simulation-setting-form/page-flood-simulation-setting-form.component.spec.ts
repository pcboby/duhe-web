/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageFloodSimulationSettingFormComponent } from './page-flood-simulation-setting-form.component';

describe('PageFloodSimulationSettingFormComponent', () => {
  let component: PageFloodSimulationSettingFormComponent;
  let fixture: ComponentFixture<PageFloodSimulationSettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFloodSimulationSettingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFloodSimulationSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
