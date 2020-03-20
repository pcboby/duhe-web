import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  ApiUserService
} from 'src/app/core/services';
import {
  NzModalService,
  NzMessageService
} from 'ng-zorro-antd';
import * as moment from 'moment';
import * as _ from 'lodash';
import configs from 'src/app/core/common/configs';
import {
  EssenceNg2PrintComponent
} from 'essence-ng2-print';

@Component({
  selector: 'app-page-dispatching-data',
  templateUrl: './page-dispatching-data.component.html',
  styleUrls: ['./page-dispatching-data.component.css']
})
export class PageDispatchingDataComponent implements OnInit {

  @ViewChild('print1', null) printComponent1: EssenceNg2PrintComponent;
  @ViewChild('print2', null) printComponent2: EssenceNg2PrintComponent;

  printDiv: any;
  showHead: boolean = true;
  hideTable1: boolean = false;
  datas: any[];
  printCSS: string[];
  printStyle: string;
  editorText = '<p style="text-align:center;line-height:150%"><strong><span style="font-family: 宋体;line-height: 150%;font-size: 21px"><span style="font-family:宋体">关于</span>××××工程项目划分的请示（函）</span></strong><span style="font-family: 宋体; font-size: 21px; text-indent: 315px;">&nbsp;</span></p><p style="line-height:150%"><strong><span style="font-family: 宋体;line-height: 150%;font-size: 16px">海淀区水利工程质量监督站：</span></strong></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××工程，依据××××文件开始建设。（简述工程概况和主要工程量）。</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px"><span style="font-family:宋体">根据《水利水电工程施工质量检验与评定规程》</span>SL176-2007）、《水利水电基本建设工程单元工程质量评定标准》（SDJ249-88）及《北京市水利工程施工质量评定标准》等有关规定，结合本工程的实际情况，经研究确认本工程项目共划分为××个单位工程，××个分部工程，××个单元工程。其中主要单位工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；主要分部工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；重要隐蔽单元工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；关键部位单元工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;。具体划分见附表。</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px"><span style="font-family:宋体">附表：</span>××××工程项目划分表</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent: 406px; line-height: 150%; text-align: right;"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××××（单位）</span></p><p style="text-indent: 398px; line-height: 150%; text-align: right;"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××年××月××日</span></p>';

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
    private msg: NzMessageService,
    private elRef: ElementRef
  ) {
    this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
    this.printStyle =
      `
      th, td {
          color: red !important;
      }
      `;

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
    // const modal = this.modalService.create({
    //   nzTitle: '详情',
    //   nzContent: SystemUserDetailComponent,
    //   nzComponentParams: {
    //     dataset: data
    //   },
    //   nzWidth: 720,
    //   nzFooter: null
    // });
  }
  // 新增
  add() {
    // const modal = this.modalService.create({
    //   nzTitle: '新增',
    //   nzContent: SystemUserEditComponent,
    //   nzComponentParams: {
    //     // upload_path : 'photo_range'
    //   },
    //   nzWidth: 720,
    //   nzFooter: [{
    //     label: '保存',
    //     disabled: (scope) => !scope.validateForm.valid,
    //     onClick: (scope) => {
    //       this.api.put(scope.validateForm.value).subscribe(res => {
    //         if (res.status === 200) {
    //           this.msg.success(res.info);
    //           modal.close();
    //           this.loadData(true);
    //           this.modalService.confirm({
    //             nzTitle: '提示：',
    //             nzContent: '是否加入地图？'
    //           });
    //         }
    //         if (res.status === 300) {
    //           this.msg.error(res.info);
    //         }

    //       }, res => {
    //         this.msg.error(res.info);
    //       });
    //     }
    //   }, {
    //     label: '取消',
    //     onClick: () => {
    //       modal.close();
    //     }
    //   }]
    // });
  }
  // 编辑
  edit(data) {
    // const modal = this.modalService.create({
    //   nzTitle: '修改',
    //   nzContent: SystemUserEditComponent,
    //   nzComponentParams: {
    //     dataset: data
    //   },
    //   nzWidth: 720,
    //   nzFooter: [{
    //     label: '保存',
    //     disabled: (scope) => !scope.validateForm.valid,
    //     onClick: (scope) => {
    //       this.api.post(scope.validateForm.value).subscribe(res => {
    //         if (res.status === 200) {
    //           this.msg.success(res.info);
    //           modal.close();
    //           this.loadData();
    //         }
    //         if (res.status === 300) {
    //           this.msg.error(res.info);
    //         }
    //       }, res => {
    //         this.msg.error(res.info);
    //       });
    //     }
    //   }, {
    //     label: '取消',
    //     onClick: () => {
    //       modal.close();
    //     }
    //   }]
    // });
    // // 关闭时执行
    // modal.afterClose.subscribe((res) => {
    //   if (res) {
    //     this.loadData();
    //   }
    // });
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

  printComplete() {
    console.log('打印完成！');
    this.showHead = true;
    this.hideTable1 = false;
  }
  getPrintDiv() {
    for (let i: number = 0; i < this.elRef.nativeElement.childNodes.length; i++) {
      let node: any = this.elRef.nativeElement.childNodes[i];
      if (node.id === 'print_div') {
        this.printDiv = node;
      }
    }
  }
  customPrint(print: string) {
    this.showHead = false;
    this.hideTable1 = true;
    this.getPrintDiv();
    if (print === 'print1') {
      this.printComponent1.print();
    } else if (print === 'print2') {
      this.printComponent2.print();
    }
  }
}
