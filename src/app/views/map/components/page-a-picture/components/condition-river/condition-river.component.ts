import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiChartTempService } from 'src/app/core/services';

@Component({
  selector: 'app-condition-river',
  templateUrl: './condition-river.component.html',
  styleUrls: ['./condition-river.component.css']
})
export class ConditionRiverComponent implements OnInit {

  @Output()
  onItemClick: EventEmitter<any> = new EventEmitter();
  @Output()
  onRiverItemClick: EventEmitter<any> = new EventEmitter();

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiChartTempService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstDatetime: [null, [Validators.required]],
      lastDatetime: [null, [Validators.required]]
    });
  }

  submitForm() {}

  itemClick(event) {
    this.onItemClick.emit(event);
  }
  riverItemClick(event) {
    this.onRiverItemClick.emit(event);
  }


}
