import { Component, OnInit } from '@angular/core';
import { ApiRiverService } from 'src/app/core/services';

@Component({
  selector: 'app-plot-real-river',
  templateUrl: './plot-real-river.component.html',
  styleUrls: ['./plot-real-river.component.css']
})
export class PlotRealRiverComponent implements OnInit {


  dataset: any;

  constructor(private api: ApiRiverService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.get().subscribe(res => {
      this.dataset = res.data;
    })
  }

}
