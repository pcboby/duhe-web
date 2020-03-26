import { Component, OnInit, OnDestroy, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-control-search',
  templateUrl: './control-search.component.html',
  styleUrls: ['./control-search.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControlSearchComponent),
    multi: true
  }]
})
export class ControlSearchComponent implements OnInit, OnDestroy {

  private _model= null;

  // model
  get model() {
    return this._model;
  }
  set model(val) {
    this._model = val;
    this.onModelChange(val);
  }

  @Input()
  placeholder = '关键字';

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

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  a() {
    console.log('onfocus');
    
  }
}
