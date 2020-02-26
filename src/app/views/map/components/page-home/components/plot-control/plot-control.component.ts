import { MapService } from './../../../../../../core/services/local/map/map.service';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-plot-control',
  templateUrl: './plot-control.component.html',
  styleUrls: ['./plot-control.component.scss']
})
export class PlotControlComponent implements OnInit {

  realRay = true;
  realWater = false;


  get checkOptions() {
    return this.map.legendList;
  }

  constructor(private map: MapService) {}

  ngOnInit() {}
  changeReal(e, v) {
    console.log(e, v);

    setTimeout(() => {
      this[e] = v;
      this[e === 'realWater' ? 'realRay' : 'realWater'] = !v;
    }, 100);
  }
  log(value: object[]): void {
    console.log(value);
  }
}
