import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-flood-dispatch-data-form',
  templateUrl: './flood-dispatch-data-form.component.html',
  styleUrls: ['./flood-dispatch-data-form.component.css']
})
export class FloodDispatchDataFormComponent implements OnInit {

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
