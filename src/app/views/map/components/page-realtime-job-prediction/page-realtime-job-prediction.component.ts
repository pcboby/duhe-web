import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/core/services';

@Component({
  selector: 'app-page-realtime-job-prediction',
  templateUrl: './page-realtime-job-prediction.component.html',
  styleUrls: ['./page-realtime-job-prediction.component.css']
})
export class PageRealtimeJobPredictionComponent implements OnInit, OnDestroy {

  isShow = false;

  get detail_prediction_isShow() {
    return this.map.detail_prediction_isShow;
  }
  set detail_prediction_isShow(val) {
    this.map.detail_prediction_isShow = val;
  }

  constructor(private map: MapService) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.detail_prediction_isShow = false;
  }

}
