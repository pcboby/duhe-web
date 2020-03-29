import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-control-search2',
  templateUrl: './control-search2.component.html',
  styleUrls: ['./control-search2.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlSearch2Component),
      multi: true
    }
  ]
})
export class ControlSearch2Component implements OnInit {
  public isFocus = false;
  public dataset = null;
  public type = null;

  pageIndex = 1;

  private _model = null;

  // model
  get model() {
    return this._model;
  }
  set model(val) {
    this._model = val;
    this.onModelChange(val);
  }

  @Input()
  placeholder = '请输入河流、测站、水库';

  @Output()
  onItemClick:EventEmitter<any> = new EventEmitter();

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

  ngOnDestroy() {}

  setFocus(b) {
    if (b) {
      this.isFocus = b;
    } else {
      setTimeout(() => {
        this.isFocus = b;
      }, 300);
    }
  }

  event($event) {
    console.log($event);
  }

  search() {
    this.dataset = [{},{},{}];
  }
  setValue(val) {
    this.model = val;
    this.search();
  }

  clear() {
    this.dataset = null;
    // this.model = null;
  }

  itemClick(d) {
    this.onItemClick.emit(d);
  }
}
