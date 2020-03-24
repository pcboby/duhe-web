import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../../core/services/local/map/map.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  viewer = null;

  dataset = [{
    label: '降雨预报',
    iconCls: 'untitled untitled-1-1'
  }, {
    label: '降雨实况',
    iconCls: 'untitled untitled-1-2'
  }, {
    label: '河道实况',
    iconCls: 'untitled untitled-1-3'
  }, {
    label: '水库实况',
    iconCls: 'untitled untitled-1-4'
  }];

  // get dropList() {
  //   return this.map.homeTooltabList;
  // }
  // set dropList(val) {
  //   this.map.homeTooltabList = val;
  // }

  get plot_weather_isShow() {
    return this.map.plot_weather_isShow;
  }
  get plot_reservoir_isShow() {
    return this.map.plot_reservoir_isShow;
  }
  get plot_river_isShow() {
    return this.map.plot_river_isShow;
  }

  constructor(private map: MapService) { }

  ngOnInit() {
  }

}
