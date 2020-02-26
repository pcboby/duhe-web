import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiChartTempService } from 'src/app/core/services';

@Component({
  selector: 'app-condition-water',
  templateUrl: './condition-water.component.html',
  styleUrls: ['./condition-water.component.css']
})
export class ConditionWaterComponent implements OnInit {


  @Output()
  onWaterItemClick: EventEmitter<any> = new EventEmitter();
  @Output()
  onReservoirItemClick: EventEmitter<any> = new EventEmitter();

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiChartTempService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstDatetime: [null, [Validators.required]],
      lastDatetime: [null, [Validators.required]]
    });
  }

  submitForm() {}

  itemReservoirClick(event) {
    this.onReservoirItemClick.emit(event);
  }
  itemWaterClick(event) {
    this.onWaterItemClick.emit(event);
  }


}
