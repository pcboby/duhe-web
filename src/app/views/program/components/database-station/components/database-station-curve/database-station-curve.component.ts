import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-database-station-curve',
  templateUrl: './database-station-curve.component.html',
  styleUrls: ['./database-station-curve.component.css']
})
export class DatabaseStationCurveComponent implements OnInit {

  stationType = 1;

  
  default_form_value = {
  };


  @Input()
  set dataset(val) {
    // tslint:disable-next-line:forin
    for (const field in this.default_form_value) {
      this.default_form_value[field][0] = val[field] === undefined ? null : val[field];
    }
  }

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group(this.default_form_value);
  }


}
