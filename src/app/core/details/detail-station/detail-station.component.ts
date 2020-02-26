import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-station',
  templateUrl: './detail-station.component.html',
  styleUrls: ['./detail-station.component.css']
})
export class DetailStationComponent implements OnInit {


  @Input()
  id = null;

  constructor() { }

  ngOnInit() {
  }

}
