import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hydrological-forecast-config-form',
  templateUrl: './hydrological-forecast-config-form.component.html',
  styleUrls: ['./hydrological-forecast-config-form.component.css']
})
export class HydrologicalForecastConfigFormComponent implements OnInit {

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
