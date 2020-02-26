import {
  Component,
  OnInit
} from '@angular/core';
import {
  ArkwebService
} from 'src/app/arkweb/services/arkweb.service';
import {
  NzModalService
} from 'ng-zorro-antd';
import {
  MapService
} from 'src/app/core/services';
import {
  DetailBufferComponent
} from './components/detail-buffer/detail-buffer.component';
import {
  DetailClipComponent
} from './components/detail-clip/detail-clip.component';
import {
  DetailChartComponent
} from './components/detail-chart/detail-chart.component';

@Component({
  selector: 'app-map-toolbar2',
  templateUrl: './map-toolbar2.component.html',
  styleUrls: ['./map-toolbar2.component.scss']
})
export class MapToolbar2Component implements OnInit {

  get dataset() {
    return this.map.toolList2;
  }


  // 图层管理
  get plot_layer_isShow() {
    return this.map.plot_layer_isShow;
  }
  set plot_layer_isShow(val) {
    this.map.plot_layer_isShow = val;
  }
  // 展示配置
  get plot_config_isShow() {
    return this.map.plot_config_isShow
  }
  set plot_config_isShow(val) {
    this.map.plot_config_isShow = val;
  }

  constructor(private arkweb: ArkwebService, private modal: NzModalService, private map: MapService) {}

  ngOnInit() {}

  toolItemClick(data) {

    switch (data.code) {
      case 'database': // 图层管理
        this.map.openPlotLayer();
        break;
      case 'search': // 查询
        break;
      case '0101': // 坐标
        this.arkweb.activeCoordinateMeasureTool();
        break;
      case '0102': // 距离
        this.arkweb.activeLengthMeasureTool();
        break;
      case '0103': // 面积
        this.arkweb.activeAreaMeasureTool();
        break;
      case '0104': // 高度
        this.arkweb.activeHeightMeasureTool();
        break;
      case '0202': // 剖面分析
        this.arkweb.activeSectionTool();
        this.arkweb.setSectionChartFunction((xData, yData) => {
          const opts = {
            xAxis: {
              type: 'category',
              data: xData,
              name: '距离(m)'
            },
            yAxis: {
              type: 'value',
              name: '高程(m)'
            },
            series: [{
              data: yData,
              type: 'line',
              areaStyle: {}
            }]
          };
          this.showCharts(opts);
        });
        break;
      case '0204':
        this.detailBuffer();
        break;
      case '0205':
        this.arkweb.activeSpaceOverLayTool();
        break;
      case '99': // 清除
        this.arkweb.clearMeasureTool();
        break;
      case '9999': // 设置
        this.map.openPlotConfig();
        break;
    }
  }

  // 弹窗：设置缓冲
  detailBuffer() {
    const modal = this.modal.create({
      nzTitle: '缓冲分析设置',
      nzContent: DetailBufferComponent,
      nzComponentParams: {
        // detailType: 'setting'
      },
      nzWidth: 540,
      nzFooter: [{
        label: '点缓冲',
        onClick: scope => {
          // const type = 'point';
          // tslint:disable-next-line:no-non-null-assertion
          const size = scope.validateForm.value.size;
          this.arkweb.activePointBufferTool();
          this.arkweb.setBufferDistance(size);
          modal.close();
        }
      }, {
        label: '线缓冲',
        onClick: scope => {
          // const type = 'line';
          const size = scope!.validateForm.value.size;
          this.arkweb.activeLineBufferTool();
          this.arkweb.setBufferDistance(size);
          modal.close();
        }
      }, {
        label: '面缓冲',
        onClick: scope => {
          // const type = 'plane';
          const size = scope!.validateForm.value.size;
          this.arkweb.activePolygonBufferTool();
          this.arkweb.setBufferDistance(size);
          modal.close();
        }
      }]
    });

  }

  // 弹窗：开挖设置
  detailClip() {
    const modal = this.modal.create({
      nzTitle: '开挖设置',
      nzContent: DetailClipComponent,
      nzComponentParams: {
        // detailType: 'setting'
      },
      nzWidth: 540,
      nzFooter: [{
        label: '开挖',
        onClick: evt => {
          // const hei = evt!.validateForm.value.size;
          // this.arkweb.activeTerrainClipTool();
          // this.arkweb.setDeepClipHeight(hei);
          modal.close();
        }
      }]
    });

  }

  // 显示图表
  showCharts(opts) {

    const modal = this.modal.create({
      nzTitle: '剖面图',
      nzContent: DetailChartComponent,
      nzComponentParams: {
        options: opts
      },
      nzWidth: 720,
      nzFooter: null
    });
  }

  //
  onSearch(event) {
    console.log(event);
  }
  onHome(event) {
    console.log(event);
  }
  onSwitch(event) {
    console.log(event);
  }

}
