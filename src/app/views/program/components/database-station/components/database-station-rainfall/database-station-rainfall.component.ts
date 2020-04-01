import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-database-station-rainfall',
  templateUrl: './database-station-rainfall.component.html',
  styleUrls: ['./database-station-rainfall.component.css']
})
export class DatabaseStationRainfallComponent implements OnInit {

  @Input()
  dataset: any;
  constructor() { }

  ngOnInit() {
  }

}
