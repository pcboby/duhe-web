import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-hydrological-forecast',
  templateUrl: './page-hydrological-forecast.component.html',
  styleUrls: ['./page-hydrological-forecast.component.css']
})
export class PageHydrologicalForecastComponent implements OnInit {

  dataset = [{
    label: '实时滚动预报',
    iconCls: 'icon icon-3-1'
  }, {
    label: '实时作业预报',
    iconCls: 'icon icon-3-1'
  }, {
    label: '预报成果管理',
    iconCls: 'icon icon-3-1'
  }, {
    label: '模型参数管理',
    iconCls: 'icon icon-3-1'
  }];

  constructor() { }

  ngOnInit() {
  }

  itemClick(event) {
    console.log(event);
  }

}
