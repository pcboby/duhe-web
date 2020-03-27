import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hydrological-forecast-data-form',
  templateUrl: './hydrological-forecast-data-form.component.html',
  styleUrls: ['./hydrological-forecast-data-form.component.css']
})
export class HydrologicalForecastDataFormComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      remember: [true]
    });
  }

}
