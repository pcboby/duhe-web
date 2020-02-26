/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageAutomaticPredictionConfigurationComponent } from './page-automatic-prediction-configuration.component';

describe('PageAutomaticPredictionConfigurationComponent', () => {
  let component: PageAutomaticPredictionConfigurationComponent;
  let fixture: ComponentFixture<PageAutomaticPredictionConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAutomaticPredictionConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAutomaticPredictionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
