import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../../core/services/local/map/map.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

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
