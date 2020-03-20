/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageWaterNewsComponent } from './page-water-news.component';

describe('PageWaterNewsComponent', () => {
  let component: PageWaterNewsComponent;
  let fixture: ComponentFixture<PageWaterNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWaterNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWaterNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
