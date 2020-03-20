/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageDispatchingSchemesComponent } from './page-dispatching-schemes.component';

describe('PageDispatchingSchemesComponent', () => {
  let component: PageDispatchingSchemesComponent;
  let fixture: ComponentFixture<PageDispatchingSchemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDispatchingSchemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDispatchingSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
