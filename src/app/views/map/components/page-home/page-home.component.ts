import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../../core/services/local/map/map.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  viewer = '降雨预报';

  //
  data_weather = {
    name: '竹山县'
  };

  //
  data_toolbar = [
    {
      label: '降雨预报',
      iconCls: 'untitled untitled-1-1'
    },
    {
      label: '降雨实况',
      iconCls: 'untitled untitled-1-2'
    },
    {
      label: '河道实况',
      iconCls: 'untitled untitled-1-3'
    },
    {
      label: '水库实况',
      iconCls: 'untitled untitled-1-4'
    }
  ];

  //
  data_legend = [
    {
      label: '河道',
      src: 'assets/download/icon-0002.png'
    },
    {
      label: '水库',
      src: 'assets/download/icon-0001.png'
    },
    {
      label: '超警超汛',
      src: 'assets/download/icon-0003.png'
    },
    {
      label: '超保证',
      src: 'assets/download/icon-0004.png'
    }
  ];

  //
  data_legend2 = [
    {
      label: '0',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#d0fefd'
      }
    },
    {
      label: '1',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#23fffa'
      }
    },
    {
      label: '2',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#21b9fc'
      }
    },
    {
      label: '4',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#0579b3'
      }
    },
    {
      label: '6',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#0250cd'
      }
    },
    {
      label: '8',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#0c2ed4'
      }
    },
    {
      label: '10',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#8816ef'
      }
    },
    {
      label: '20',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#6c059e'
      }
    },
    {
      label: '>50',
      style: {
        width: '5px',
        height: '16px',
        backgroundColor: '#4d056a'
      }
    }
  ];

  constructor(private map: MapService) { }

  ngOnInit() { }
}
