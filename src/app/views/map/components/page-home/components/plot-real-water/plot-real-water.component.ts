import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiWaterService
} from 'src/app/core/services';

@Component({
  selector: 'app-plot-real-water',
  templateUrl: './plot-real-water.component.html',
  styleUrls: ['./plot-real-water.component.css']
})
export class PlotRealWaterComponent implements OnInit {

  dataset: any;

  constructor(private api: ApiWaterService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.get().subscribe(res => {
      this.dataset = res.data;
    })
  }

}
