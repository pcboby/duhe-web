import {
  MapService
} from './../../../../../../core/services/local/map/map.service';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-condition-rain-control',
  templateUrl: './condition-rain-control.component.html',
  styleUrls: ['./condition-rain-control.component.css']
})
export class ConditionRainControlComponent implements OnInit {
  //
  get rainViewType() {
    return this.map.rainViewType;
  }
  set rainViewType(val) {
    this.map.rainViewType = val;
  }

  listSteps = [{
    min: 0,
    max: 10,
    style: {
      'background-color': '#9bf688'
    }
  }, {
    min: 10,
    max: 25,
    style: {
      'background-color': '#017614'
    }
  }, {
    min: 25,
    max: 50,
    style: {
      'background-color': '#40b1f6'
    }
  }, {
    min: 50,
    max: 100,
    style: {
      'background-color': '#2200f3'
    }
  }, {
    min: 100,
    max: 200,
    style: {
      'background-color': '#f900f4'
    }
  }, {
    min: 200,
    style: {
      'background-color': '#6e0003'
    }
  }];

  constructor(private map: MapService) {}

  ngOnInit() {}

}
