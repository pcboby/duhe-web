import {
  Injectable
} from '@angular/core';
import {
  aPictureTooltabList,
  homeTooltabList,
  arkwebToolList,
  arkwebToolList2
} from 'src/app/core/modules/lookups';
import {
  ApiPredictionService
} from '../../apis/api-prediction.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // 实时预报数据
  data_prediction = {};

  // 工具
  toolList = arkwebToolList;
  toolList2 = arkwebToolList2;
  // 首页
  homeTooltabList = homeTooltabList;
  // 一张图
  aPictureTooltabList = aPictureTooltabList;
  aPictureSelected = 'rain';

  // 图层管理展示
  plot_layer_isShow = false;
  // 设置管理展示
  plot_config_isShow = false;
  // 首页 气象
  plot_weather_isShow = true;
  plot_reservoir_isShow = true;
  plot_river_isShow = true;
  //
  //
  // 信息展示
  detail_rain_isShow = false;
  detail_water_isShow = false;
  detail_river_isShow = false;
  detail_condition_river_isShow = false;
  detail_work_isShow = false;
  detail_gate_isShow = false;
  // 水文站展示
  detail_station_isShow = false;
  // 水库展示
  detail_reservoir_isShow = false;
  // 视频展示
  detail_video_isShow = false;
  // 预报结果展示
  detail_prediction_isShow = false;

  rainViewType = 0;

  legendList = [{
    min: null,
    max: 0,
    value: 1204,
    checked: true,
    style: {
      'background-color': 'white'
    }
  }, {
    min: 0,
    max: 10,
    value: 807,
    checked: true,
    style: {
      'background-color': 'gray'
    }
  }, {
    min: 10,
    max: 25,
    value: 247,
    checked: true,
    style: {
      'background-color': 'blue'
    }
  }, {
    min: 25,
    max: 50,
    value: 157,
    checked: true,
    style: {
      'background-color': 'yello'
    }
  }, {
    min: 50,
    max: 100,
    value: 30,
    checked: true,
    style: {
      'background-color': 'red'
    }
  }, {
    min: 100,
    max: 200,
    value: 5,
    checked: true,
    style: {
      'background-color': 'red'
    }
  }, {
    min: 200,
    max: null,
    value: 0,
    checked: true,
    style: {
      'background-color': 'black'
    }
  }];

  constructor(private apiPrediction: ApiPredictionService) {}

  //
  openPlotLayer() {
    this.plot_layer_isShow = true;
  }
  closePlotLayer() {
    this.plot_layer_isShow = false;
  }
  //
  openPlotConfig() {
    this.plot_config_isShow = true;
  }
  closePlotConfig() {
    this.plot_config_isShow = false;
  }
  //
  openDetailRain(params) {
    this.detail_rain_isShow = true;
  }
  closeDetailRain() {
    this.detail_rain_isShow = false;
  }
  //
  openDetailWater(params) {
    this.detail_water_isShow = true;
  }
  closeDetailWater() {
    this.detail_water_isShow = false;
  }
  //
  openDetailRiver(params) {
    this.detail_river_isShow = true;
  }
  closeDetailRiver() {
    this.detail_river_isShow = false;
  }
  openConditionRiverItem(params) {
    this.detail_condition_river_isShow = true;
  }
  closeConditionRiverItem(params) {
    this.detail_condition_river_isShow = false;
  }
  //
  openDetailWork(params) {
    this.detail_work_isShow = true;
  }
  closeDetailWork() {
    this.detail_work_isShow = false;
  }
  //
  openDetailGate(params) {
    this.detail_gate_isShow = true;
  }
  closeDetailGate() {
    this.detail_gate_isShow = false;
  }
  //
  openDetailStation(params) {
    this.detail_station_isShow = true;
  }
  closeDetailStation() {
    this.detail_station_isShow = false;
  }
  //
  openDetailReservoir(params) {
    this.detail_reservoir_isShow = true;
  }
  closeDetailReservoir() {
    this.detail_reservoir_isShow = false;
  }
  //
  videoPlay() {
    this.detail_video_isShow = true;
  }
  videoStop() {
    this.detail_video_isShow = false;
  }
  // 关闭所有临时打开的详情对话框
  closeAllDetail() {
    // this.closePlotLayer();
    this.closeDetailRain();
    this.closeDetailWater();
    this.closeDetailRiver();
    this.closeDetailWork();
    this.closeDetailStation();
    this.closeDetailReservoir();
  }

  // 加载：实时预报
  loadData_prediction() {
    this.apiPrediction.getJson().subscribe(res => {
      this.data_prediction = res.data;
    });
  }

}
