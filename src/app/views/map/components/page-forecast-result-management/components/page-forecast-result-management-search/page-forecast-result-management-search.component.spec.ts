/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageForecastResultManagementSearchComponent } from './page-forecast-result-management-search.component';

describe('PageForecastResultManagementSearchComponent', () => {
  let component: PageForecastResultManagementSearchComponent;
  let fixture: ComponentFixture<PageForecastResultManagementSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageForecastResultManagementSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForecastResultManagementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
