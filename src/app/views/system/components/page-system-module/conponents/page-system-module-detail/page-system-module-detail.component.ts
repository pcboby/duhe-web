import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-system-module-detail',
  templateUrl: './page-system-module-detail.component.html',
  styleUrls: ['./page-system-module-detail.component.css']
})
export class PageSystemModuleDetailComponent implements OnInit {

  @Input()
  dataset: any;

  constructor() { }

  ngOnInit() {
  }

}
