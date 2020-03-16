import { DialogMapMiniHydrologicalComponent } from './components/dialog-map-mini-hydrological/dialog-map-mini-hydrological.component';
import { DialogMapMiniHydropowerComponent } from './components/dialog-map-mini-hydropower/dialog-map-mini-hydropower.component';
import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, HostBinding } from '@angular/core';
import { DialogMapMiniReservoirComponent } from './components/dialog-map-mini-reservoir/dialog-map-mini-reservoir.component';

@Component({
  selector: 'app-control-map-mini',
  templateUrl: './control-map-mini.component.html',
  styleUrls: ['./control-map-mini.component.css']
})
export class ControlMapMiniComponent implements OnInit {
  dataset = [
    {
      mode: 'line',
      local: 'horizontal',
      style: {
        top: '40%',
        left: '2%',
        width: '94%'
      }
    },
    {
      mode: 'text',
      label: '泗河',
      style: {
        top: '40%',
        left: '5%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '竹叶关',
      type: 'hydropower',
      style: {
        top: '40%',
        left: '10%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '竹叶关2',
      type: 'hydropower',
      style: {
        top: '40%',
        left: '16%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '双河口',
      type: 'hydropower',
      style: {
        top: '40%',
        left: '22%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '鄂坪',
      color: 'green',
      type: 'reservoir',
      style: {
        top: '40%',
        left: '28%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '周家垸',
      type: 'hydropower',
      style: {
        top: '40%',
        left: '34%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '白果坪',
      type: 'hydropower',
      style: {
        top: '40%',
        left: '40%'
      }
    },
    {
      mode: 'line',
      local: 'vertical',
      style: {
        top: '2%',
        left: '46%',
        height: '38%'
      }
    },
    {
      mode: 'text',
      label: '潭口河',
      style: {
        top: '8%',
        left: '46%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '冯家湾',
      type: 'hydropower',
      style: {
        top: '20%',
        left: '46%'
      }
    },
    {
      mode: 'point',
      local: 'top',
      label: '新洲',
      type: 'hydrological',
      style: {
        top: '40%',
        left: '50%'
      }
    },
    {
      mode: 'line',
      local: 'vertical',
      style: {
        top: '40%',
        left: '58%',
        height: '60%'
      }
    },
    {
      mode: 'text',
      label: '泉河',
      style: {
        top: '96%',
        left: '58%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '白沙河',
      color: 'green',
      type: 'reservoir',
      style: {
        top: '48%',
        left: '58%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '龙滩',
      type: 'hydropower',
      style: {
        top: '58%',
        left: '58%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '大峡',
      type: 'hydropower',
      style: {
        top: '68%',
        left: '58%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '红岩二级',
      type: 'hydropower',
      style: {
        top: '78%',
        left: '58%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '红岩一级',
      type: 'hydropower',
      style: {
        top: '88%',
        left: '58%'
      }
    },
    {
      mode: 'text',
      label: '堵河',
      style: {
        top: '40%',
        left: '66%'
      }
    },
    {
      mode: 'line',
      local: 'vertical',
      style: {
        top: '40%',
        left: '70%',
        height: '52%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '松树岭',
      type: 'hydropower',
      style: {
        top: '48%',
        left: '70%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '龙背湾',
      color: 'green',
      type: 'reservoir',
      style: {
        top: '58%',
        left: '70%'
      }
    },
    {
      mode: 'point',
      local: 'right',
      label: '老码头',
      type: 'hydrological',
      style: {
        top: '68%',
        left: '70%'
      }
    },
    {
      mode: 'text',
      label: '官渡河',
      style: {
        top: '76%',
        left: '70%'
      }
    },
    {
      mode: 'text',
      label: '公祖河',
      style: {
        left: '70%',
        bottom: '8%'
      }
    },
    {
      mode: 'line',
      local: 'horizontal',
      style: {
        left: '70%',
        width: '15%',
        top: '80%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '邱家榜',
      type: 'hydropower',
      style: {
        top: '80%',
        left: '76%'
      }
    },
    {
      mode: 'text',
      label: '洪坪河',
      style: {
        left: '82%',
        top: '80%'
      }
    },
    {
      mode: 'line',
      local: 'vertical',
      style: {
        top: '40%',
        left: '85%',
        height: '30%'
      }
    },
    {
      mode: 'box',
      local: 'horizontal',
      label: '霍河',
      color: 'green',
      type: 'reservoir',
      style: {
        top: '58%',
        left: '85%'
      }
    },
    {
      mode: 'text',
      label: '霍河',
      style: {
        top: '65%',
        left: '85%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '潘口',
      color: 'green',
      type: 'reservoir',
      style: {
        top: '40%',
        left: '75%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '小漩',
      type: 'hydropower',
      style: {
        top: '40%',
        left: '81%'
      }
    },
    {
      mode: 'point',
      local: 'top',
      label: '新竹',
      type: 'hydrological',
      style: {
        top: '40%',
        left: '85%'
      }
    },
    {
      mode: 'line',
      local: 'vertical',
      style: {
        top: '15%',
        left: '96%',
        height: '55%'
      }
    },
    {
      mode: 'box',
      local: 'vertical',
      label: '黄龙滩',
      color: 'green',
      type: 'reservoir',
      style: {
        top: '40%',
        left: '89%'
      }
    },
    {
      mode: 'point',
      local: 'top',
      label: '黄龙滩',
      type: 'hydrological',
      style: {
        top: '40%',
        left: '93%'
      }
    },
    {
      mode: 'text',
      label: '汉水',
      style: {
        top: '65%',
        left: '96%'
      }
    }
  ];

  @HostBinding('class')
  get class() {
    return 'group-map-mini';
  }

  constructor(private modalService: NzModalService) {}

  ngOnInit() {}

  event(item) {
    switch (item.type) {
      case 'hydropower':
        // this.dialogHydropower(item);
        break;
      // 控制性水库
      case 'reservoir':
        this.dialogReservoir(item);
        break;
      // 水文站
      case 'hydrological':
        this.dialogHydrological(item);
        break;

      default:
        console.log(item);
        break;
    }
  }
  // 水电站
  dialogHydropower(item) {
    const modal = this.modalService.create({
      nzTitle: '水电站：' + item.label,
      nzContent: DialogMapMiniHydropowerComponent,
      nzComponentParams: {
        // upload_path: this.upload_path
      },
      nzWidth: 420,
      nzFooter: [{
        label: '保存',
        // disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          // const params = scope.validateForm.value;
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
  }
  dialogReservoir(item) {
    const modal = this.modalService.create({
      nzTitle: '控制性水库：' + item.label,
      nzContent: DialogMapMiniReservoirComponent,
      nzComponentParams: {
        // upload_path: this.upload_path
      },
      nzWidth: 420,
      nzFooter: [{
        label: '保存',
        // disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          // const params = scope.validateForm.value;
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
  }
  dialogHydrological(item) {
    const modal = this.modalService.create({
      nzTitle: '水文站：' + item.label,
      nzContent: DialogMapMiniHydrologicalComponent,
      nzComponentParams: {
        // upload_path: this.upload_path
      },
      nzWidth: 420,
      nzFooter: [{
        label: '保存',
        // disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          // const params = scope.validateForm.value;
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
  }
}
