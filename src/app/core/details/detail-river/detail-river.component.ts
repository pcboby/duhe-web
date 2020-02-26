import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-river',
  templateUrl: './detail-river.component.html',
  styleUrls: ['./detail-river.component.css']
})
export class DetailRiverComponent implements OnInit {

  @Input()
  id = null;

  constructor() { }

  ngOnInit() {
  }

}
