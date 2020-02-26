import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @Input()
  dataset: any;

  @Output()
  onItemClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @HostBinding('class')
  get className() {
    return 'group-cameera';
  }

  itemClick(event) {
    this.onItemClick.emit(event);
  }

}
