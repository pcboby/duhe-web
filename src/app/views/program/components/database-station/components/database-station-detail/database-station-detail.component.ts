import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-database-station-detail',
  templateUrl: './database-station-detail.component.html',
  styleUrls: ['./database-station-detail.component.css']
})
export class DatabaseStationDetailComponent implements OnInit {

  @Input()
  dataset: any;
  constructor() { }

  ngOnInit() {
  }

}
