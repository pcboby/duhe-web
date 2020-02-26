import {
  Component,
  OnInit
} from '@angular/core';
import { MapService } from 'src/app/core/services';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent implements OnInit {

  isShow = false;

  pics = [{
    src: '/assets/themes/default/images/water/waterNormalsSmall.jpg'
  }, {
    src: '/assets/themes/default/images/water/waterNormalsSmall.jpg'
  }, {
    src: '/assets/themes/default/images/water/waterNormalsSmall.jpg'
  }, {
    src: '/assets/themes/default/images/water/waterNormalsSmall.jpg'
  }];

  // cameraList = [{
  //   name: 'cap-01',
  //   url: 'http://127.0.0.1'
  // }, {
  //   name: 'cap-02',
  //   url: 'http://127.0.0.2'
  // }, {
  //   name: 'cap-03',
  //   url: 'http://127.0.0.3'
  // }, {
  //   name: 'cap-04',
  //   url: 'http://127.0.0.4'
  // }];

  constructor(private map: MapService) {}

  ngOnInit() {}

  // cameraPlay(event) {
  //   console.log('cameraPlay', event);
  //   this.map.videoPlay();
  // }

  swiperChange(event) {
    this.isShow = true;
  }

}
