import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-map-mini-reservoir',
  templateUrl: './dialog-map-mini-reservoir.component.html',
  styleUrls: ['./dialog-map-mini-reservoir.component.css']
})
export class DialogMapMiniReservoirComponent implements OnInit {

  
  default_form_value = {
    F_Start: [null, [Validators.required]] // 起始水位
  };


  // @Input()
  // set dataset(val) {
  //   // tslint:disable-next-line:forin
  //   for (const field in this.default_form_value) {
  //     this.default_form_value[field][0] = val[field] === undefined ? null : val[field];
  //   }
  // }

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group(this.default_form_value);
  }

}
