import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-system-model-detail',
  templateUrl: './page-system-model-detail.component.html',
  styleUrls: ['./page-system-model-detail.component.css']
})
export class PageSystemModelDetailComponent implements OnInit {

  @Input()
  dataset: any;

  constructor() { }

  ngOnInit() {
  }

}
