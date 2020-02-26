import {
  MapService
} from 'src/app/core/services';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-plot-config',
  templateUrl: './plot-config.component.html',
  styleUrls: ['./plot-config.component.css']
})
export class PlotConfigComponent implements OnInit {

  data_satellite = null; // 卫星图
  data_topographic = null; // 地形图
  data_electronic = null; // 电子图

  viewSize = [0,0,0,0];
  autoRay = '0';
  stepRay = null;
  autoWater = '0';
  stepWater = null;

  get plot_weather_isShow() {
    return this.map.plot_weather_isShow;
  }
  set plot_weather_isShow(val) {
    this.map.plot_weather_isShow = val;
  }
  get plot_reservoir_isShow() {
    return this.map.plot_reservoir_isShow;
  }
  set plot_reservoir_isShow(val) {
    this.map.plot_reservoir_isShow = val;
  }
  get plot_river_isShow() {
    return this.map.plot_river_isShow;
  }
  set plot_river_isShow(val) {
    this.map.plot_river_isShow = val;
  }

  constructor(private map: MapService) {}

  ngOnInit() {}

  saveAll() {
    console.log('saveAll!');
  }
  resetAll() {
    console.log('resetAllConfig!');
  }

  onEvent(evt) {
    console.log(evt);
  }

}
