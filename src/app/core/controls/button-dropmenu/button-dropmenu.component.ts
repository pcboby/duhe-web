import {
  Component,
  OnInit,
  forwardRef,
  Input
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-button-dropmenu',
  templateUrl: './button-dropmenu.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonDropmenuComponent),
    multi: true
  }]
})
export class ButtonDropmenuComponent implements OnInit {


  private _model: any;
  private _disabled = false; // 组件状态
  private _size = 'default';
  private _placement = 'bottomLeft'; // 'bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'
  private _type = 'default'; // default, primary, dashed, danger, link

  get model() {
    return this._model;
  }
  set model(val) {
    this._model = val;
    this.onModelChange(this._model);
  }

  // disabled
  @Input('ngSize')
  get size() {
    return this._size;
  }
  set size(val) {
    this._size = val;
  }

  @Input('ngType')
  get type() {
    return this._type;
  }
  set type(val) {
    this._type = val;
  }

  // disabled
  @Input('ngDisabled')
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
  }

  // placement
  @Input('ngPlacement')
  get placement() {
    return this._placement;
  }
  set placement(val) {
    this._placement = val;
  }

  onModelChange: Function = () => {};

  constructor() {}
  // 赋值时调用
  writeValue(val: object): void {
    this._model = val;
  }

  // 页面值改变时，调用该方法，传入新值实现回传
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {}

  ngOnInit() {}


}
