import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  selected = 0;
  dataset = [
    {
      label: '白沙河',
      url: '/assets/banner/1.png'
    },
    {
      label: '黄龙滩',
      url: '/assets/banner/2.png'
    },
    {
      label: '霍河水库',
      url: '/assets/banner/3.png'
    },
    {
      label: '龙背湾',
      url: '/assets/banner/4.png'
    },
    {
      label: '潘口',
      url: '/assets/banner/5.png'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
