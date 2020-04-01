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
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextareaComponent),
    multi: true
  }]
})

export class InputTextareaComponent implements OnInit {

  private _model: any; // 组件值
  private _disabled = false; // 组件状态
  private _placeHolder = '请输入...'; // 输入提示

  // model
  get model() {
    return this._model;
  }
  set model(val) {
    this._model = val;
    this.onModelChange(this._model);
  }

  // placeHolder
  @Input()
  get placeHolder() {
    return this._placeHolder;
  }
  set placeHolder(val) {
    this._placeHolder = val;
  }

  // disabled
  @Input('ngDisabled')
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
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
