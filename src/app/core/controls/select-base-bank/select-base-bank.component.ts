import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { lookup_base_banks } from '../../modules/lookups';

@Component({
  selector: 'app-select-base-bank',
  templateUrl: './select-base-bank.component.html',
  styleUrls: ['./select-base-bank.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectBaseBankComponent),
    multi: true
  }]
})
export class SelectBaseBankComponent implements OnInit {

  /**************************************************************************************************************
   *
   * 初始化设置
   *
   **************************************************************************************************************/

  private _model = null; // 组件值
  private _disabled = false; // 组件状态
  private _dataset = lookup_base_banks; // 下拉可选列表，支持组件外传入
  private _placeHolder = '请选择...'; // 输入提示

  private _field = 'key'; // 设置显示的字段
  private _target = 'value'; // 设置返回的字段
  // 说明：field和target要配套使用，选择对返回的target，则设置的field的值必需对应，否则会存在值无法自动选中的问题，包括数据类型

  // model
  get model() {
    return this._model;
  }
  set model(val) {
    this._model = val;
    this.onModelChange(this._model);
  }

  // disabled
  @Input('ngDisabled')
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
  }
  // dataset
  @Input()
  get dataset() {
    return this._dataset;
  }
  set dataset(val) {
    this._dataset = val;
  }
  // placeHolder
  @Input()
  get placeHolder() {
    return this._placeHolder;
  }
  set placeHolder(val) {
    this._placeHolder = val;
  }
  // target
  @Input()
  get target() {
    return this._target;
  }
  set target(val) {
    this._target = val;
  }
  // field
  @Input()
  get field() {
    return this._field;
  }
  set field(val) {
    this._field = val;
  }



  onModelChange: Function = () => {};

  constructor() {}

  // 赋值时调用
  writeValue(val): void {
    this._model = val;
  }

  // 页面值改变时，调用该方法，传入新值实现回传
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {}

  ngOnInit() {}

  /**************************************************************************************************************
   *
   * 常用函数
   *
   **************************************************************************************************************/

}
