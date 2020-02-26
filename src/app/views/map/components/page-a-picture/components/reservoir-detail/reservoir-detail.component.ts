import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/core/services';

@Component({
  selector: 'app-reservoir-detail',
  templateUrl: './reservoir-detail.component.html',
  styleUrls: ['./reservoir-detail.component.css']
})
export class ReservoirDetailComponent implements OnInit {

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
  // }];

  constructor(private map: MapService) {}

  ngOnInit() {}

  // cameraPlay(event) {
  //   // console.log('cameraPlay', event);
  //   this.map.videoPlay();
  // }

  swiperChange(event) {
    this.isShow = true;
  }

}
