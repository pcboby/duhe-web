import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DatabaseStationDetailComponent } from './components/database-station-detail/database-station-detail.component';
import { DatabaseStationEditComponent } from './components/database-station-edit/database-station-edit.component';
import { ApiUserService } from 'src/app/core/services';
import configs from 'src/app/core/common/configs';
import { DatabaseStationFloodComponent } from './components/database-station-flood/database-station-flood.component';
import { DatabaseStationLevelComponent } from './components/database-station-level/database-station-level.component';
import { DatabaseStationRainfallComponent } from './components/database-station-rainfall/database-station-rainfall.component';
import { DatabaseStationWaterComponent } from './components/database-station-water/database-station-water.component';
import { DatabaseStationCurveComponent } from './components/database-station-curve/database-station-curve.component';

@Component({
  selector: 'app-database-station',
  templateUrl: './database-station.component.html',
  styleUrls: ['./database-station.component.css']
})
export class DatabaseStationComponent implements OnInit {

  /**************************************************************************************************************
   *
   * 初始化设置
   *
   **************************************************************************************************************/
  dataset = []; // 显示数据

  searchParams = null; // 查询的参数
  pageIndex = 1; // 列表当前页
  pageSize = 10; // 单页条数
  total = 0; // 条数总计
  pageLoading = true; // 加载状态


  checkField = 'id'; // 选择的字段
  allChecked = false; // 是否全选
  indeterminate = false; // 是否半选
  get checkedItems() { // 是否有选中
    const tmp = [];
    this.dataset.forEach((item) => {
      if (item.checked) {
        tmp.push(item[this.checkField]);
      }
    });
    return tmp;
  }


  constructor(
    private api: ApiUserService,
    private modalService: NzModalService,
    private msg: NzMessageService
  ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  /**************************************************************************************************************
   *
   * 常用函数
   *
   **************************************************************************************************************/

  // 详情
  detail(data) {
    const modal = this.modalService.create({
      nzTitle: '详情',
      nzContent: DatabaseStationDetailComponent,
      nzComponentParams: {
        dataset: data
      },
      nzWidth: 820,
      nzFooter: null
    });
  }
  // 新增
  add() {
    const modal = this.modalService.create({
      nzTitle: '新增',
      nzContent: DatabaseStationEditComponent,
      nzComponentParams: {
        // upload_path : 'photo_range'
      },
      nzWidth: 820,
      nzFooter: [{
        label: '保存',
        disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          this.api.put(scope.validateForm.value).subscribe(res => {
            if (res.status === 200) {
              this.msg.success(res.info);
              modal.close();
              this.loadData(true);
              this.modalService.confirm({
                nzTitle: '提示：',
                nzContent: '是否加入地图？'
              });
            }
            if (res.status === 300) {
              this.msg.error(res.info);
            }

          }, res => {
            this.msg.error(res.info);
          });
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
  }
  // 编辑
  edit(data) {
    const modal = this.modalService.create({
      nzTitle: '修改',
      nzContent: DatabaseStationEditComponent,
      nzComponentParams: {
        dataset: data
      },
      nzWidth: 820,
      nzFooter: [{
        label: '保存',
        disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          this.api.post(scope.validateForm.value).subscribe(res => {
            if (res.status === 200) {
              this.msg.success(res.info);
              modal.close();
              this.loadData();
            }
            if (res.status === 300) {
              this.msg.error(res.info);
            }
          }, res => {
            this.msg.error(res.info);
          });
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
    // 关闭时执行
    modal.afterClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
  // 编辑防洪指标
  editFlood(data) {
    const modal = this.modalService.create({
      nzTitle: '防洪指标',
      nzContent: DatabaseStationFloodComponent,
      nzComponentParams: {
        dataset: data
      },
      nzWidth: 820,
      nzFooter: [{
        label: '保存',
        disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          this.api.post(scope.validateForm.value).subscribe(res => {
            if (res.status === 200) {
              this.msg.success(res.info);
              modal.close();
              this.loadData();
            }
            if (res.status === 300) {
              this.msg.error(res.info);
            }
          }, res => {
            this.msg.error(res.info);
          });
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
    // 关闭时执行
    modal.afterClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
  // 编辑特征曲线
  editCurve(data) {
    const modal = this.modalService.create({
      nzTitle: '特征曲线',
      nzContent: DatabaseStationCurveComponent,
      nzComponentParams: {
        dataset: data
      },
      nzWidth: 820,
      nzFooter: [{
        label: '保存',
        disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          this.api.post(scope.validateForm.value).subscribe(res => {
            if (res.status === 200) {
              this.msg.success(res.info);
              modal.close();
              this.loadData();
            }
            if (res.status === 300) {
              this.msg.error(res.info);
            }
          }, res => {
            this.msg.error(res.info);
          });
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
    // 关闭时执行
    modal.afterClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
  // 编辑汛限水位
  editLevel(data) {
    const modal = this.modalService.create({
      nzTitle: '汛限水位',
      nzContent: DatabaseStationLevelComponent,
      nzComponentParams: {
        dataset: data
      },
      nzWidth: 480,
      nzFooter: [{
        label: '保存',
        disabled: (scope) => !scope.validateForm.valid,
        onClick: (scope) => {
          this.api.post(scope.validateForm.value).subscribe(res => {
            if (res.status === 200) {
              this.msg.success(res.info);
              modal.close();
              this.loadData();
            }
            if (res.status === 300) {
              this.msg.error(res.info);
            }
          }, res => {
            this.msg.error(res.info);
          });
        }
      }, {
        label: '取消',
        onClick: () => {
          modal.close();
        }
      }]
    });
    // 关闭时执行
    modal.afterClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
  // 详情雨情
  detailRainfall(data) {
    const modal = this.modalService.create({
      nzTitle: '雨情详情',
      nzContent: DatabaseStationRainfallComponent,
      nzComponentParams: {
        dataset: data
      },
      nzWidth: 820,
      nzFooter: null
    });
  }
  // 详情水情
  detailWater(data) {
    const modal = this.modalService.create({
      nzTitle: '水情详情',
      nzContent: DatabaseStationWaterComponent,
      nzComponentParams: {
        dataset: data
      },
      nzWidth: 820,
      nzFooter: null
    });
  }
  // 删除
  del(ids) {
    this.modalService.confirm({
      nzTitle: '<i>提醒：</i>',
      nzContent: '<b>您是确定要删除码？</b>',
      nzOnOk: () => {
        this.api.del(String(ids)).subscribe(res => {
          this.msg.success(res.info);
          this.loadData();
        });
      }
    });
  }

  // 加载数据
  loadData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }

    this.pageLoading = true;

    const params = _.assign({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }, this.searchParams);

    this.api.getJson(params).subscribe((res) => {
      console.log(res);
      this.dataset = res.data;
      this.total = res.page.total;
      this.pageLoading = false;
    }, (err) => {
      this.pageLoading = false;
      this.msg.info(err.info);
    });
  }

  refreshChecked(): void {
    const allChecked = this.dataset.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.dataset.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataset.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshChecked();
  }

  // 查询
  doSearch(params) {
    this.searchParams = {
      keyword: params['keyword'],
      classify: params['classify'],
      status: params['statu'],
      modifyStart: params['dateRange'] ?
        moment(params['dateRange'][0]).format(configs().DATE_FORMAT) : null,
      modifyEnd: params['dateRange'] ?
        moment(params['dateRange'][1]).format(configs().DATE_FORMAT) : null
    };
    this.loadData(true);
  }
}
