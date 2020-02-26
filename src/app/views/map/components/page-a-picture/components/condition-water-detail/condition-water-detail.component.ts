import {
  NzModalService
} from 'ng-zorro-antd';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import * as echarts from 'echarts';
import untils from '../../../../../../core/common/untils';
import {
  ApiChartTempService
} from 'src/app/core/services';
import { SwitchYearComponent } from 'src/app/core/components';

@Component({
  selector: 'app-condition-water-detail',
  templateUrl: './condition-water-detail.component.html',
  styleUrls: ['./condition-water-detail.component.css']
})
export class ConditionWaterDetailComponent implements OnInit {

  chartOption = null;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiChartTempService, private modal: NzModalService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstDatetime: [null, [Validators.required]],
      lastDatetime: [null, [Validators.required]]
    });

    this.loadData();
  }

  submitForm() {}


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

  addHistory() {
    this.modal.create({
      // nzTitle: '年份选择',
      nzContent: SwitchYearComponent,
      nzOnOk: (scorp) => {
        console.log(scorp.year);
      }
    });
  }

}
