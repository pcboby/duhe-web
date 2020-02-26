import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.css']
})
export class EchartsComponent implements OnInit {

  @Input()
  options = null;

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  constructor() { }

  ngOnInit() {
  }

}
