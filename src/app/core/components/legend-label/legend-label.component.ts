import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-legend-label',
  templateUrl: './legend-label.component.html',
  styleUrls: ['./legend-label.component.css']
})
export class LegendLabelComponent implements OnInit {

  @Input()
  dataset = null;

  constructor() { }

  ngOnInit() {
  }

}
