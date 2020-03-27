import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flood-dispatch-contrast',
  templateUrl: './flood-dispatch-contrast.component.html',
  styleUrls: ['./flood-dispatch-contrast.component.css']
})
export class FloodDispatchContrastComponent implements OnInit {
  data_labels = [
    {
      label: '方案一',
      style: {
        color: 'red'
      }
    },
    {
      label: '方案二',
      style: {
        color: 'red'
      }
    },
    {
      label: '方案三',
      style: {
        color: 'red'
      }
    }
  ];

  constructor() {}

  ngOnInit() {}
}
