import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-page-realtime-job-prediction-flood-chart2',
  templateUrl: './page-realtime-job-prediction-flood-chart2.component.html',
  styleUrls: ['./page-realtime-job-prediction-flood-chart2.component.css']
})
export class PageRealtimeJobPredictionFloodChart2Component implements OnInit {


  chartOption = null;


  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  submitForm() {}


  loadData() {
    this.chartOption = this.getChartOption();
  }



  getChartOption() {
    return {
      angleAxis: {},
      radiusAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四'],
        z: 10
      },
      polar: {},
      series: [{
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'A',
        stack: 'a'
      }, {
        type: 'bar',
        data: [2, 4, 6, 8],
        coordinateSystem: 'polar',
        name: 'B',
        stack: 'a'
      }, {
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'C',
        stack: 'a'
      }],
      legend: {
        show: true,
        data: ['A', 'B', 'C']
      }
    };
  }

}
