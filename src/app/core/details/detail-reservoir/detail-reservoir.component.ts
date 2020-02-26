import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-reservoir',
  templateUrl: './detail-reservoir.component.html',
  styleUrls: ['./detail-reservoir.component.css']
})
export class DetailReservoirComponent implements OnInit {

  @Input()
  id = null;

  constructor() { }

  ngOnInit() {
  }

}
