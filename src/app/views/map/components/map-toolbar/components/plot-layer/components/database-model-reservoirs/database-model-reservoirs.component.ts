import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd';
import {
  ApiDatabaseService
} from 'src/app/core/services';
import { ArkwebService } from 'src/app/arkweb/services/arkweb.service';

@Component({
  selector: 'app-database-model-reservoirs',
  templateUrl: './database-model-reservoirs.component.html',
  styleUrls: ['./database-model-reservoirs.component.css']
})
export class DatabaseModelReservoirsComponent implements OnInit {

  defaultCheckedKeys = ['0-0-0'];
  defaultSelectedKeys = ['0-0-0'];
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  nodes = [{
      title: '0-0',
      key: '0-0',
      expanded: true,
      children: [{
          title: '0-0-0',
          key: '0-0-0',
          children: [{
              title: '0-0-0-0',
              key: '0-0-0-0',
              isLeaf: true
            },
            {
              title: '0-0-0-1',
              key: '0-0-0-1',
              isLeaf: true
            },
            {
              title: '0-0-0-2',
              key: '0-0-0-2',
              isLeaf: true
            }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [{
              title: '0-0-1-0',
              key: '0-0-1-0',
              isLeaf: true
            },
            {
              title: '0-0-1-1',
              key: '0-0-1-1',
              isLeaf: true
            },
            {
              title: '0-0-1-2',
              key: '0-0-1-2',
              isLeaf: true
            }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [{
          title: '0-1-0-0',
          key: '0-1-0-0',
          isLeaf: true
        },
        {
          title: '0-1-0-1',
          key: '0-1-0-1',
          isLeaf: true
        },
        {
          title: '0-1-0-2',
          key: '0-1-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];
  dataset = null;


  constructor(
    private api: ApiDatabaseService,
    private arkweb: ArkwebService) {}

  ngOnInit() {
    this.loadData();
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  loadData() {
    this.api.getModelJson().subscribe(res => {
      console.log('getModelJson', res);
      this.dataset = res.data.filter(item => {
        item.isLeaf = true;
        return true;
      });
      setTimeout(() => {
        this.dataset.forEach(item => {
          this.onCheckBoxChange(item);
        });
      }, 0);
    });
  }

  nzDbClickEvent(event): void {
    console.log('11');
    const origin = event;
    if (origin.destination) {
      const des = origin.destination;
      let desArray = [];
      desArray = des.split(',');
      if (desArray.length === 2) {
        const lon = parseFloat(desArray[0].toString()).toFixed(5);
        const lat = parseFloat(desArray[1].toString()).toFixed(5);
        this.arkweb.core.viewer.camera.flyTo({
          destination: ArkWeb.Cartesian3.fromDegrees(lon, lat, 3000)
        });
      }
    }
    // this.arkweb.modelManager.addmodel(origin);
  }

  onCheckBoxChange(event) {
    // console.log('onCheckBoxChange', event);
    const origin = event;
    if (origin.checked) {
      this.arkweb.modelManager.addmodel(origin);
    } else {
      this.arkweb.modelManager.removemodel(origin);
    }
  }
}
