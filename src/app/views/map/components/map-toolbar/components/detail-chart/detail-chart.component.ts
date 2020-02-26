import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-chart',
  templateUrl: './detail-chart.component.html',
  styleUrls: ['./detail-chart.component.css']
})
export class DetailChartComponent implements OnInit {

  @Input()
  options = null;

  constructor() { }

  ngOnInit() {
  }

}
