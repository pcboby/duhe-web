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

  // showItem(event) {
  //   let opts = null;
  //   switch (event.type) {
  //     case 'K': // 水库
  //       opts = {
  //         nzTitle: event.data.name,
  //         nzContent: DetailReservoirComponent,
  //         nzComponentParams: {
  //           id: event.data.id
  //         }
  //       };
  //       break;
  //     case 'H': // 河流
  //       opts = {
  //         nzTitle: event.data.name,
  //         nzContent: DetailRiverComponent,
  //         nzComponentParams: {
  //           id: event.data.id
  //         }
  //       };
  //       break;
  //     case 'Z': // 测站
  //       opts = {
  //         nzTitle: event.data.name,
  //         nzContent: DetailStationComponent,
  //         nzComponentParams: {
  //           id: event.data.id
  //         }
  //       };
  //       break;
  //   }
  //   const modal = this.modalService.create({
  //     ...opts,
  //     nzFooter: null
  //   });

  // }


  constructor(
    // private map: MapService
    private modalService: NzModalService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {
  }

  onEvent(d) {
    console.log(d);
  }


}
