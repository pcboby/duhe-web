import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiChartTempService
} from 'src/app/core/services';
import untils from 'src/app/core/common/untils';

@Component({
  selector: 'app-page-contrast-dispatching-schemes-chart1',
  templateUrl: './page-contrast-dispatching-schemes-chart1.component.html',
  styleUrls: ['./page-contrast-dispatching-schemes-chart1.component.css']
})
export class PageContrastDispatchingSchemesChart1Component implements OnInit {


  chartOption = {
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


  constructor(private api: ApiChartTempService) {}

  ngOnInit() {

  }



  loadData() {}


}
