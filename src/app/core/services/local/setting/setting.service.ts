import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  // 卫星图列表
  data_satellites = [{
    name: '卫星图1',
    value: 'W_XXXXX1'  // code or ID
  },{
    name: '卫星图2',
    value: 'W_XXXXX2'
  },{
    name: '卫星图3',
    value: 'W_XXXXX3'
  }];
  // 地形图列表
  data_topographics = [{
    name: '地形图1',
    value: 1
  },{
    name: '地形图2',
    value: 2
  },{
    name: '地形图3',
    value: 3
  }];
  // 电子图列表
  data_electronics = [{
    name: '电子图1',
    value: 1
  },{
    name: '电子图2',
    value: 2
  },{
    name: '电子图3',
    value: 3
  }];

constructor() { }

}
