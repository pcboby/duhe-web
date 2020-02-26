import { NzModalService } from 'ng-zorro-antd';
import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {
  MapService
} from '../../services';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {

  get alarmDay() {
    return this.map.data_prediction['alarmDay'] || 0;
  }
  get safeDay() {
    return this.map.data_prediction['safeDay'] || 0;
  }
  get predictionDay() {
    return this.map.data_prediction['predictionDay'] || 0;
  }

  get startDatetime() {
    return this.map.data_prediction['startDatetime'];
  }

  get endDatetime() {
    return this.map.data_prediction['endDatetime'];
  }


  get detail_prediction_isShow() {
    return this.map.detail_prediction_isShow;
  }
  set detail_prediction_isShow(val) {
    this.map.detail_prediction_isShow = val;
  }

  @HostBinding('class')
  get className() {
    return 'group-prediction';
  }

  constructor(private map: MapService, private modal: NzModalService) {}

  ngOnInit() {
    this.map.loadData_prediction();
  }

}
