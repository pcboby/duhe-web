import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiChartTempService
} from 'src/app/core/services';
import untils from 'src/app/core/common/untils';

@Component({
  selector: 'app-page-contrast-dispatching-schemes-chart2',
  templateUrl: './page-contrast-dispatching-schemes-chart2.component.html',
  styleUrls: ['./page-contrast-dispatching-schemes-chart2.component.css']
})
export class PageContrastDispatchingSchemesChart2Component implements OnInit {


  chartOption = {
    angleAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      z: 10
    },
    radiusAxis: {},
    polar: {},
    series: [{
      type: 'bar',
      data: [1, 2, 3, 4, 3, 5, 1],
      coordinateSystem: 'polar',
      name: 'A',
      stack: 'a'
    }, {
      type: 'bar',
      data: [2, 4, 6, 1, 3, 2, 1],
      coordinateSystem: 'polar',
      name: 'B',
      stack: 'a'
    }, {
      type: 'bar',
      data: [1, 2, 3, 4, 1, 2, 5],
      coordinateSystem: 'polar',
      name: 'C',
      stack: 'a'
    }],
    legend: {
      show: true,
      data: ['A', 'B', 'C']
    }
  };


  constructor(private api: ApiChartTempService) {}

  ngOnInit() {

  }


}
