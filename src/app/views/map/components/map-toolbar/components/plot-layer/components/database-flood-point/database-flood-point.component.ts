import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  selector: 'app-database-flood-point',
  templateUrl: './database-flood-point.component.html',
  styleUrls: ['./database-flood-point.component.css']
})
export class DatabaseFloodPointComponent implements OnInit {

  defaultCheckedKeys = ['0-0-0'];
  defaultSelectedKeys = ['0-0-0'];
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  nodes = [
  ];


  constructor() {}

  ngOnInit() {}
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
