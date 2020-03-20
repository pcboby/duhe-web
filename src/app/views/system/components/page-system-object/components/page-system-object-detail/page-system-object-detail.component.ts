import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-system-object-detail',
  templateUrl: './page-system-object-detail.component.html',
  styleUrls: ['./page-system-object-detail.component.css']
})
export class PageSystemObjectDetailComponent implements OnInit {

  @Input()
  dataset: any;

  constructor() { }

  ngOnInit() {
  }

}
