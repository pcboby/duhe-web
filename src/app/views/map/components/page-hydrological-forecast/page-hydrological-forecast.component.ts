import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-hydrological-forecast',
  templateUrl: './page-hydrological-forecast.component.html',
  styleUrls: ['./page-hydrological-forecast.component.css']
})
export class PageHydrologicalForecastComponent implements OnInit {

  viewer = null;

  dataset = [{
    label: '实时滚动预报',
    iconCls: 'untitled untitled-3-1'
  }, {
    label: '实时作业预报',
    iconCls: 'untitled untitled-3-2'
  }, {
    label: '预报成果管理',
    iconCls: 'untitled untitled-3-3'
  }, {
    label: '模型参数管理',
    iconCls: 'untitled untitled-3-4'
  }];

  constructor() { }

  ngOnInit() {
  }


}
