import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit, AfterViewInit {

  element = null;

  swiper = null;

  private _opts = null;

  private defaultOptions = {
    // slidesPerView: 'auto',
    // freeMode: true,
    // observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    // observeParents: true
  };


  @Input()
  dataset = null;

  @Input()
  get options() {
    return this._opts;
  }
  set options(val) {
    this._opts = val;
  }

  @Input()
  slidesPerView = null;
  @Input()
  spaceBetween = 10;
  @Input()
  showNavigation = false;
  @Input()
  showPagination = false;


  @Output()
  onItemClick: EventEmitter < any > = new EventEmitter();


  constructor(private ref: ElementRef) {}

  ngOnInit() {

  }
  ngAfterViewInit() {
    const opts = _.assign(this.defaultOptions, this.options)
    if (this.slidesPerView) {
      opts.slidesPerView = this.slidesPerView;
      opts.spaceBetween = this.spaceBetween;
    }
    if (this.showPagination) {
      opts.pagination = {
        el: '.swiper-pagination',
        clickable: true,
      };
    }
    if (this.showNavigation) {
      opts.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }
    this.swiper = new Swiper(this.ref.nativeElement.querySelector('.swiper-container'), opts);
  }

  itemClick(data) {
    this.onItemClick.emit(data);
  }


}
