/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRunningailySearchComponent } from './page-runningaily-search.component';

describe('PageRunningailySearchComponent', () => {
  let component: PageRunningailySearchComponent;
  let fixture: ComponentFixture<PageRunningailySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRunningailySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRunningailySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
