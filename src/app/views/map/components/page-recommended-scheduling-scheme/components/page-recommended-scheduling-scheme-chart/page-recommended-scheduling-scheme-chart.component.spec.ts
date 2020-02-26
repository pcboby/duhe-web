/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRecommendedSchedulingSchemeChartComponent } from './page-recommended-scheduling-scheme-chart.component';

describe('PageRecommendedSchedulingSchemeChartComponent', () => {
  let component: PageRecommendedSchedulingSchemeChartComponent;
  let fixture: ComponentFixture<PageRecommendedSchedulingSchemeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRecommendedSchedulingSchemeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRecommendedSchedulingSchemeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
