/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageJointSchedulingSchemeChartComponent } from './page-joint-scheduling-scheme-chart.component';

describe('PageJointSchedulingSchemeChartComponent', () => {
  let component: PageJointSchedulingSchemeChartComponent;
  let fixture: ComponentFixture<PageJointSchedulingSchemeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJointSchedulingSchemeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJointSchedulingSchemeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
