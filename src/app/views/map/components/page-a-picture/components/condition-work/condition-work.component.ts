import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-condition-work',
  templateUrl: './condition-work.component.html',
  styleUrls: ['./condition-work.component.css']
})
export class ConditionWorkComponent implements OnInit {


  @Output()
  onItemClick: EventEmitter<any> = new EventEmitter();

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      type: [0],
      keyword: [null]
    });
  }

  submitForm() {}

  itemClick(event) {
    this.onItemClick.emit(event);
  }

}
