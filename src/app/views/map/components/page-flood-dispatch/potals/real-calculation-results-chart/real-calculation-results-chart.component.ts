import { Component, OnInit } from '@angular/core';
import { ApiChartTempService } from 'src/app/core/services';
import untils from 'src/app/core/common/untils';

@Component({
  selector: 'app-real-calculation-results-chart',
  templateUrl: './real-calculation-results-chart.component.html',
  styleUrls: ['./real-calculation-results-chart.component.css']
})
export class RealCalculationResultsChartComponent implements OnInit {

  chartOption = null;


  constructor(private api: ApiChartTempService) {}

  ngOnInit() {


    this.loadData();
  }



  loadData() {
    this.api.getJson().subscribe(res => {
      res.timebar = untils().GetNetTimeLabel(res.beginDatetime, res.steps, 24 * 60);
      this.chartOption = this.getChartOption(res);

    });
  }



  getChartOption(data) {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: ['水位', '入库流量', '出库流量'],
        align: 'left',
        left: 0,
        // itemGap: 5
      },
      grid: {
        top: '16%',
        left: '3%',
        right: '3%',
        bottom: '16%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        name: '日期',
        data: data.timebar
      }],
      yAxis: [{
        type: 'value',
        name: '水位(m)'
      }, {
        type: 'value',
        name: '流量(m3/s)'
      }],
      dataZoom: [

        {
          type: 'inside',
          show: true,
          start: 0,
          end: 10
        },
        {
          type: 'slider',
          start: 0,
          end: 10
        }
        // {
        //   show: true,
        //   yAxisIndex: 0,
        //   filterMode: 'empty',
        //   width: 20,
        //   height: '80%',
        //   showDataShadow: false,
        //   left: '93%'
        // }
      ],
      series: [{
        name: '水位',
        type: 'line',
        data: data.data1
      }, {
        name: '入库流量',
        type: 'line',
        yAxisIndex: 1,
        data: data.data2
      }, {
        name: '出库流量',
        type: 'line',
        yAxisIndex: 1,
        data: data.data3
      }]
    };
  }
}
