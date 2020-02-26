/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRecommendedSchedulingSchemeValuesComponent } from './page-recommended-scheduling-scheme-values.component';

describe('PageRecommendedSchedulingSchemeValuesComponent', () => {
  let component: PageRecommendedSchedulingSchemeValuesComponent;
  let fixture: ComponentFixture<PageRecommendedSchedulingSchemeValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRecommendedSchedulingSchemeValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRecommendedSchedulingSchemeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
