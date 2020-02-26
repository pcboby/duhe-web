import {
  Component,
  OnInit
} from '@angular/core';
import {
  NzFormatEmitEvent
} from 'ng-zorro-antd';
import {
  ApiDatabaseService
} from 'src/app/core/services';
import { ArkwebService } from 'src/app/arkweb/services/arkweb.service';

@Component({
  selector: 'app-database-rivers',
  templateUrl: './database-rivers.component.html',
  styleUrls: ['./database-rivers.component.css']
})
export class DatabaseRiversComponent implements OnInit {

  defaultCheckedKeys = ['0-0-0'];
  defaultSelectedKeys = ['0-0-0'];
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  dataset = null;
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


  constructor(
    private api: ApiDatabaseService,
    private arkweb: ArkwebService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getRiverJson().subscribe(res => {
      console.log('getVectorJson', res);
      this.dataset = res.data.filter(item => {
        item.isLeaf = true;
        return true;
      });
      setTimeout(() => {
        this.dataset.forEach(item => {
          this.onCheckBoxChange(item);
        });
      }, 1000);
    });
  }




  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  onCheckBoxChange(item) {
    console.log(item);
    if (item.checked) {
      this.arkweb.vectorManager.addvector(item);
    } else {
      this.arkweb.vectorManager.removevector(item);
    }

  }
}
