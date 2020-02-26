/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageContrastDispatchingSchemesFormComponent } from './page-contrast-dispatching-schemes-form.component';

describe('PageContrastDispatchingSchemesFormComponent', () => {
  let component: PageContrastDispatchingSchemesFormComponent;
  let fixture: ComponentFixture<PageContrastDispatchingSchemesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContrastDispatchingSchemesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContrastDispatchingSchemesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
