import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  T = null;

  auto = true;
  autoTime = 3;

  selected = 1;

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

  ngOnInit() {
    if (this.auto) {
      this.play();
    }
  }
  ngOnDestroy() {
    this.stopPlay();
  }

  setView(n) {
    this.selected = n;
    if (this.auto) {
      this.stopPlay();
      this.play();
    }
  }

  play() {
    this.auto = true;
    const len = this.dataset.length;
    if (len > 1) {
      this.T = setInterval(() => {
        this.selected = this.selected + 1 < len ? this.selected + 1 : 0;
      }, this.autoTime * 1000);
    } else {
      this.stopPlay();
    }
  }
  
  stopPlay() {
    this.auto = false;
    if (this.T) {
      clearInterval(this.T);
      this.T = null;
    }
  }
}
