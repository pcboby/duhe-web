import { ArkwebService } from './../../../../../../arkweb/services/arkweb.service';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-map-toolbar2-switch',
  templateUrl: './map-toolbar2-switch.component.html',
  styleUrls: ['./map-toolbar2-switch.component.css']
})
export class MapToolbar2SwitchComponent implements OnInit {

  selected = 3;

  dList = [{
    name: '2D',
    className: 'iconfont icon-erwei',
    value: 2
  }, {
    name: '3D',
    className: 'iconfont icon-sanwei',
    value: 3
  }];

  get selectedItem() {
    return this.dList.find(item => item.value === this.selected);
  }

  get dataset() {
    return this.dList.filter(item => item.value !== this.selected);
  }

  constructor(private arkweb: ArkwebService) {}

  ngOnInit() {
    this.onSwitch(this.selected);
  }

  onSwitch(val) {
    this.selected = val;
    this.arkweb.core.viewer.scene.mode = this.selected;
  }

}
