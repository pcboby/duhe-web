import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-database-rainfall-detail',
  templateUrl: './database-rainfall-detail.component.html',
  styleUrls: ['./database-rainfall-detail.component.css']
})
export class DatabaseRainfallDetailComponent implements OnInit {

  @Input()
  dataset: any;
  constructor() { }

  ngOnInit() {
  }

}
