import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-database-station-flood',
  templateUrl: './database-station-flood.component.html',
  styleUrls: ['./database-station-flood.component.css']
})
export class DatabaseStationFloodComponent implements OnInit {

  
  
  default_form_value = {
  };

  @Input()
  stationType = 1;

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
