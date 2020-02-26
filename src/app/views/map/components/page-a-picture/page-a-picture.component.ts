import {
  NzModalService
} from 'ng-zorro-antd';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  MapService
} from '../../../../core/services/local/map/map.service';
import {
  DetailReservoirComponent
} from 'src/app/core/details/detail-reservoir/detail-reservoir.component';
import {
  DetailRiverComponent
} from 'src/app/core/details/detail-river/detail-river.component';
import {
  DetailStationComponent
} from 'src/app/core/details/detail-station/detail-station.component';


@Component({
  selector: 'app-page-a-picture',
  templateUrl: './page-a-picture.component.html',
  styleUrls: ['./page-a-picture.component.css']
})
export class PageAPictureComponent implements OnInit, OnDestroy {

  keyword = null;

  showItem(event) {
    let opts = null;
    switch (event.type) {
      case 'K': // 水库
        opts = {
          nzTitle: event.data.name,
          nzContent: DetailReservoirComponent,
          nzComponentParams: {
            id: event.data.id
          }
        };
        break;
      case 'H': // 河流
        opts = {
          nzTitle: event.data.name,
          nzContent: DetailRiverComponent,
          nzComponentParams: {
            id: event.data.id
          }
        };
        break;
      case 'Z': // 测站
        opts = {
          nzTitle: event.data.name,
          nzContent: DetailStationComponent,
          nzComponentParams: {
            id: event.data.id
          }
        };
        break;
    }
    const modal = this.modalService.create({
      ...opts,
      nzFooter: null
    });

  }

  // //
  // get tooltabList() {
  //   return this.map.aPictureTooltabList;
  // }
  // set tooltabList(val) {
  //   this.map.aPictureTooltabList = val;
  // }
  // //
  // get selected() {
  //   return this.map.aPictureSelected;
  // }
  // set selected(val) {
  //   this.map.aPictureSelected = val;
  // }
  // //
  // get detail_rain_isShow() {
  //   return this.map.detail_rain_isShow;
  // }
  // set detail_rain_isShow(val) {
  //   this.map.detail_rain_isShow = val;
  // }
  // //
  // get detail_water_isShow() {
  //   return this.map.detail_water_isShow;
  // }
  // set detail_water_isShow(val) {
  //   this.map.detail_water_isShow = val;
  // }
  // //
  // get detail_river_isShow() {
  //   return this.map.detail_river_isShow;
  // }
  // set detail_river_isShow(val) {
  //   this.map.detail_river_isShow = val;
  // }

  // //
  // get detail_condition_river_isShow() {
  //   return this.map.detail_condition_river_isShow;
  // }
  // set detail_condition_river_isShow(val) {
  //   this.map.detail_condition_river_isShow = val;
  // }
  // //
  // get detail_work_isShow() {
  //   return this.map.detail_work_isShow;
  // }
  // set detail_work_isShow(val) {
  //   this.map.detail_work_isShow = val;
  // }
  // // 水文站
  // get detail_station_isShow() {
  //   return this.map.detail_station_isShow;
  // }
  // set detail_station_isShow(val) {
  //   this.map.detail_station_isShow = val;
  // }
  // // 水库
  // get detail_reservoir_isShow() {
  //   return this.map.detail_reservoir_isShow;
  // }
  // set detail_reservoir_isShow(val) {
  //   this.map.detail_reservoir_isShow = val;
  // }
  // //
  // get detail_gate_isShow() {
  //   return this.map.detail_gate_isShow;
  // }
  // set detail_gate_isShow(val) {
  //   this.map.detail_gate_isShow = val;
  // }
  // // 视频
  // get detail_video_isShow() {
  //   return this.map.detail_video_isShow;
  // }
  // set detail_video_isShow(val) {
  //   this.map.detail_video_isShow = val;
  // }


  constructor(
    // private map: MapService
    private modalService: NzModalService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {
    // this.map.closeAllDetail();
  }

  // // 雨情信息：点击
  // rainItemClick(event) {
  //   console.log(event);
  //   this.map.openDetailRain(event);
  // }
  // stationItemClick(event) {
  //   this.map.openDetailStation(event);
  // }

  // // 水情信息：水库：点击
  // waterItemClick(event) {
  //   console.log(event);
  //   this.map.openDetailWater(event);
  // }
  // reservoirItemClick(event) {
  //   this.map.openDetailReservoir(event);
  // }

  // // 水情信息：河道：点击
  // riverItemClick(event) {
  //   console.log(event);
  //   this.map.openDetailRiver(event);
  // }
  // conditionRiverItemClick(event) {
  //   this.map.openConditionRiverItem(event);
  // }

  // // 工情信息：点击
  // workItemClick(event) {
  //   console.log(event);
  //   this.map.openDetailWork(event);
  // }
  // gateItemClick(event) {
  //   this.map.openDetailGate(event);
  // }


}
