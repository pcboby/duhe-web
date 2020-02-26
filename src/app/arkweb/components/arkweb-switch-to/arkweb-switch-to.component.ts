import { ArkwebService } from './../../services/arkweb.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-arkweb-switch-to',
  templateUrl: './arkweb-switch-to.component.html',
  styleUrls: ['./arkweb-switch-to.component.scss']
})
export class ArkwebSwitchToComponent implements OnInit {

  @Input('ngType')
  type = '';

  selected = 3;

  switchList = [{
    label: '2D',
    value: 2
  }, {
    label: '3D',
    value: 3
  }];

  constructor(private arkweb: ArkwebService) { }

  ngOnInit() {
  }

  itemClick(event) {
    // 在这里做2/3D切换
    console.log(event);
    if (event === 2) {
      this.arkweb.core.viewer.scene.mode = 2;
    } else {
      this.arkweb.core.viewer.scene.mode = 3;
    }

  }

}
