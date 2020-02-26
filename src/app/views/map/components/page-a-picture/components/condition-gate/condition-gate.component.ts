import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-condition-gate',
  templateUrl: './condition-gate.component.html',
  styleUrls: ['./condition-gate.component.css']
})
export class ConditionGateComponent implements OnInit {


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
