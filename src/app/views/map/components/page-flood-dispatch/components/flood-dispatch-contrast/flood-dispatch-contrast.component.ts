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
        color: '#62c3fa'
      }
    },
    {
      label: '方案二',
      style: {
        color: '#87d03f'
      }
    },
    {
      label: '方案三',
      style: {
        color: '#edf73f'
      }
    }
  ];

  constructor() {}

  ngOnInit() {}
}
