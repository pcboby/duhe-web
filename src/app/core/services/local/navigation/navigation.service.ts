import {
  Injectable
} from '@angular/core';
import {
  navigationList
} from 'src/app/core/modules/lookups';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  // 主菜单
  master = navigationList;
  // 次菜单
  get sub(): any {
    return this.master.filter(item => item.value === this.selected_master)[0]['children'];
  }

  // 是否隐藏地图
  get mapDisabeld() {
    const mas = this.master.find(item => item.value === this.selected_master).mapDisabled;
    let sub = false;
    if (this.sub) {
      const e = this.selectedPath.find(item => item.value === this.selected_sub);
      if (e && e.mapDisabled !== undefined) {
        sub = e.mapDisabled;
      }
    }
    return mas || sub;
  }

  // 是否显示预报
  get predictionVisabled() {
    const mas = this.master.find(item => item.value === this.selected_master).predictionVisabled;
    let sub = false;
    if (this.sub) {
      const e = this.selectedPath.find(item => item.value === this.selected_sub);
      if (e && e.predictionVisabled !== undefined) {
        sub = e.predictionVisabled;
      }
    }
    return mas || sub;
  }

  // 主选中
  selected_master = 'APicture'; // Home | APicture;
  // 次选中
  selected_sub: any;

  // 路径
  selectedPath: any;


  constructor() {}

  // getSubDefaultSelected(data) {
  //   return data.children ? this.getSubDefaultSelected(data.children[0]) : data.value;
  // }

  getDefaultPath(params) {
    const o = params;
    return o.data.children ? this.getDefaultPath({
      data: o.data.children[0],
      path: [...o.path, o.data.children[0]]
    }) : o;
  }

}
