import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit {


  // get areamap() {
  //   return this.map.default_areamap;
  // }
  areamap = [];

  @Input()
  label = null;

  @Input()
  dataset = null;

  @Output()
  onItemClick: EventEmitter < any > = new EventEmitter();

  @HostBinding('class')
  get className() {
    return 'areamap';
  }

  constructor() {}

  ngOnInit() {
  }


  traceMap(val) {
    if (val.id) {
      const e = this.dataset.find(item => item.id === val.id);
      return e ? e.value > 1 : false;
    }

    return false;
  }

  itemClick(type, event) {
    const evt = {
      type,
      event
    };
    this.onItemClick.emit(event);
  }

}
