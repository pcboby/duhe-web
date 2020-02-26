/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRecommendedSchedulingSchemeTreeComponent } from './page-recommended-scheduling-scheme-tree.component';

describe('PageRecommendedSchedulingSchemeTreeComponent', () => {
  let component: PageRecommendedSchedulingSchemeTreeComponent;
  let fixture: ComponentFixture<PageRecommendedSchedulingSchemeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRecommendedSchedulingSchemeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRecommendedSchedulingSchemeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
