import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-database-station-water',
  templateUrl: './database-station-water.component.html',
  styleUrls: ['./database-station-water.component.css']
})
export class DatabaseStationWaterComponent implements OnInit {

  @Input()
  dataset: any;
  constructor() { }

  ngOnInit() {
  }

}
