/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRecommendedSchedulingSchemeGridComponent } from './page-recommended-scheduling-scheme-grid.component';

describe('PageRecommendedSchedulingSchemeGridComponent', () => {
  let component: PageRecommendedSchedulingSchemeGridComponent;
  let fixture: ComponentFixture<PageRecommendedSchedulingSchemeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRecommendedSchedulingSchemeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRecommendedSchedulingSchemeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
