import {
  Component,
  OnInit
} from '@angular/core';
import {
  NzFormatEmitEvent
} from 'ng-zorro-antd';

@Component({
  selector: 'app-page-joint-scheduling-scheme-tree',
  templateUrl: './page-joint-scheduling-scheme-tree.component.html',
  styleUrls: ['./page-joint-scheduling-scheme-tree.component.css']
})
export class PageJointSchedulingSchemeTreeComponent implements OnInit {



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

  constructor() {}

  ngOnInit() {}

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
