import {
  Component,
  OnInit,
  forwardRef,
  Input
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
  SettingService
} from '../../services';

@Component({
  selector: 'app-select-electronic-map',
  templateUrl: './select-electronic-map.component.html',
  styleUrls: ['./select-electronic-map.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectElectronicMapComponent),
    multi: true
  }]
})
export class SelectElectronicMapComponent implements OnInit {

  /**************************************************************************************************************
   *
   * 初始化设置
   *
   **************************************************************************************************************/


  private _model: any; // 组件值
  private _disabled = false; // 组件状态
  private _dataset = []; // 下拉可选列表，支持组件外传入
  private _placeHolder = '请选择电子图'; // 输入提示
  private _modeType = 'default'; // 'multiple' 丨 'tags' 丨 'default'

  private _field = 'name'; // 设置显示的字段（设为空，则依次显示label|title|key|自身，有值，则显示值的字段）
  private _target = 'value'; // 设置返回的字段(设为空，则值返回值本身，如果设字符，则返回值的字段)
  // 说明：field和target要配套使用，选择对返回的target，则设置的field的值必需对应，否则会存在值无法自动选中的问题，包括数据类型

  isLoading = false;
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
  // @Input()
  // get dataset() {
  //   return this._dataset;
  // }
  // set dataset(val) {
  //   this._dataset = val;
  // }
  get dataset() {
    return this.setting.data_electronics;
  }
  // placeHolder
  @Input()
  get placeHolder() {
    return this._placeHolder;
  }
  set placeHolder(val) {
    this._placeHolder = val;
  }
  // modeType
  @Input()
  get modeType() {
    return this._modeType;
  }
  set modeType(val) {
    this._modeType = val;
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

  constructor(private setting: SettingService) {}

  // 赋值时调用
  writeValue(val): void {
    this._model = val;
  }

  // 页面值改变时，调用该方法，传入新值实现回传
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {}

  ngOnInit() {
    // this.loadData();
  }

  /**************************************************************************************************************
   *
   * 常用函数
   *
   **************************************************************************************************************/

  // loadData() {
  //   this.isLoading = true;
  //   this.api.queryAll().subscribe((res) => {
  //     this.dataset = res.data;
  //     this.isLoading = false;
  //   });
  // }
}
