/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageRunningailyComponent } from './page-runningaily.component';

describe('PageRunningailyComponent', () => {
  let component: PageRunningailyComponent;
  let fixture: ComponentFixture<PageRunningailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRunningailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRunningailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
