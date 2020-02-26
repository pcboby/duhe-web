import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd';
import {
  ApiDatabaseService
} from 'src/app/core/services';
import { ArkwebService } from 'src/app/arkweb/services/arkweb.service';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-database-station',
  templateUrl: './database-station.component.html',
  styleUrls: ['./database-station.component.css']
})
export class DatabaseStationComponent implements OnInit {

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



  constructor(
    private api: ApiDatabaseService,
    private arkweb: ArkwebService) {}

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.api.getStationJson().subscribe(res => {
      console.log('getStationJson', res);
      if (res.children.length > 0) {
        this.nodes = res.children.filter(child => {
          if (child.children && child.children.length > 0 ) {
            child.children = child.children.filter(item => {
              if (item.children && item.children.length > 0 ) {
                item.children = item.children.filter(leaf => {
                  leaf.isLeaf = true;
                });
              }
              item.isLeaf = true;
              return true;
            });
          } else {
            child.isLeaf = true;
            return true;
          }
          return true;
        });
        // this.nodes = res.children;
        setTimeout(() => {
          this.nodes.forEach(child => {
            if (child.children.length > 0) {
              child.children.forEach(item => {
                this.onCheckBoxChange(item);
              });
            } else if (child.isLeaf) {
              this.onCheckBoxChange(child);
            }
          });
        }, 1000);
      } else {
        this.nodes = res.data.filter(item => {
          item.isLeaf = true;
          return true;
        });
        setTimeout(() => {
          this.nodes.forEach(item => {
            this.onCheckBoxChange(item);
          });
        }, 1000);
      }
    });
  }


  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  onCheckBoxChange(item) {
    if (item.isLeaf) {
      this.checkedLeaf(item);
    } else if (item.children && item.children.length > 0) {
      item.children.forEach(leaf => {
        this.checkedLeaf(leaf);
      });

    }
  }
  checkedLeaf(item) {
    console.log(item);
    if (item.checked) {
      this.arkweb.vectorManager.addvector(item);
    } else {
      this.arkweb.vectorManager.removevector(item);
    }
  }
}
