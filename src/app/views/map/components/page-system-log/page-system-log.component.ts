import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/core/services';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import * as _ from 'lodash';
import configs from 'src/app/core/common/configs';

@Component({
  selector: 'app-page-system-log',
  templateUrl: './page-system-log.component.html',
  styleUrls: ['./page-system-log.component.css']
})
export class PageSystemLogComponent implements OnInit {



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
