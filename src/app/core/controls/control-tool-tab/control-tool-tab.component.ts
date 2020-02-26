import {
  Component,
  OnInit,
  HostBinding,
  forwardRef,
  Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-control-tool-tab',
  templateUrl: './control-tool-tab.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControlToolTabComponent),
    multi: true
  }]
})
export class ControlToolTabComponent implements OnInit {

  private _model: any;
  private _dataset = [];

  // model
  get model() {
    return this._model;
  }
  set model(val) {
    this._model = val;
    this.onModelChange(this._model);
  }

  @Input()
  get dataset() {
    return this._dataset;
  }
  set dataset(val) {
    this._dataset = val;
  }


  ngOnInit() {}

  @HostBinding('class')
  get className() {
    const cls = ['tooltab'];
    return cls.join(' ');
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


}
