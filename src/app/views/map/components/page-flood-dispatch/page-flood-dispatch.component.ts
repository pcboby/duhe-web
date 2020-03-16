import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-flood-dispatch',
  templateUrl: './page-flood-dispatch.component.html',
  styleUrls: ['./page-flood-dispatch.component.css']
})
export class PageFloodDispatchComponent implements OnInit {

  viewer = null;

  dataset = [{
    label: '实时防洪调度',
    iconCls: 'icon icon-4-1'
  }, {
    label: '调度成果管理',
    iconCls: 'icon icon-4-1'
  }, {
    label: '调度方案对比',
    iconCls: 'icon icon-4-1'
  }];

  constructor() { }

  ngOnInit() {
  }

  itemClick(event) {
    console.log(event);
  }
}
