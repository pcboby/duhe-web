/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageDispatchingSchemesSearchComponent } from './page-dispatching-schemes-search.component';

describe('PageDispatchingSchemesSearchComponent', () => {
  let component: PageDispatchingSchemesSearchComponent;
  let fixture: ComponentFixture<PageDispatchingSchemesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDispatchingSchemesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDispatchingSchemesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
