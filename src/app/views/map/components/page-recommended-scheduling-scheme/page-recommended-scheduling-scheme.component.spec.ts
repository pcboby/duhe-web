/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRecommendedSchedulingSchemeComponent } from './page-recommended-scheduling-scheme.component';

describe('PageRecommendedSchedulingSchemeComponent', () => {
  let component: PageRecommendedSchedulingSchemeComponent;
  let fixture: ComponentFixture<PageRecommendedSchedulingSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRecommendedSchedulingSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRecommendedSchedulingSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
