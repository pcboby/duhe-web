import {
  ApiMapSearchService
} from './../../services/apis/api-map-search.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-detail-search',
  templateUrl: './detail-search.component.html',
  styleUrls: ['./detail-search.component.css']
})
export class DetailSearchComponent implements OnInit {

  private _keyword = null;
  private _type = null;

  pageTotal = 0; // 总条数
  pageIndex = 1; // 当前页
  pageSize = 10; // 单页条数
  pageLoading = false; // 加载进度
  pageModol = 'small'; // 显示方案 'middle' | 'small' | 'default'

  dataset = null;

  types = [{
    value: null,
    label: '全部'
  }, {
    value: 'K',
    label: '水库'
  }, {
    value: 'H',
    label: '河流'
  }, {
    value: 'Z',
    label: '测站'
  }];

  @Input()
  get keyword() {
    return this._keyword;
  }
  set keyword(val) {
    this._keyword = val;
    this.loadData();
  }

  get type() {
    return this._type;
  }
  set type(val) {
    this._type = val;
    this.loadData();
  }

  @Output()
  onItemClick: EventEmitter < any > = new EventEmitter();


  constructor(private api: ApiMapSearchService) {}

  ngOnInit() {}

  loadData() {
    if (this.keyword) {
      this.pageLoading = true;
      const params = {
        keyword: this.keyword,
        type: this.type,
        index: this.pageIndex
      };
      this.api.get(params).subscribe(res => {
        console.log(res);

        this.pageTotal = res.page.total;
        this.pageIndex = res.page.index;

        this.dataset = res.data;
        this.pageLoading = false;
      },err=>{
        this.pageLoading = false;
      });
    }
  }

  showItem(type, data) {
    this.onItemClick.emit({type, data});
  }

}
