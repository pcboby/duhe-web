import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-database-station-edit',
  templateUrl: './database-station-edit.component.html',
  styleUrls: ['./database-station-edit.component.css']
})
export class DatabaseStationEditComponent implements OnInit {

  
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
