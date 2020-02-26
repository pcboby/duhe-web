import { MapService } from 'src/app/core/services';
import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-condition-rain',
  templateUrl: './condition-rain.component.html',
  styleUrls: ['./condition-rain.component.css']
})
export class ConditionRainComponent implements OnInit {

  legendList = null;

  @Output()
  onRainItemClick: EventEmitter<any> = new EventEmitter();
  @Output()
  onStationItemClick: EventEmitter<any> = new EventEmitter();

  limitList = [{
    min: 0,
    max: 20,
    color: '#6dd400'
  }, {
    min: 20,
    max: 50,
    color: '#979797'
  }, {
    min: 50,
    color: '#e02020'
  }];

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private map: MapService) {
    this.legendList = _.clone(this.map.legendList);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstDatetime: [null, [Validators.required]],
      lastDatetime: [null, [Validators.required]]
    });
  }

  submitForm() {}

  itemStationClick(event) {
    this.onStationItemClick.emit(event);
  }
  itemRainClick(event) {
    this.onRainItemClick.emit(event);
  }

}
