import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  forwardRef,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-control-player',
  templateUrl: './control-player.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControlPlayerComponent),
    multi: true
  }]
})
export class ControlPlayerComponent implements OnInit, OnDestroy {

  private _model: any; // 组件值 // 当前帧
  private _frames = 0; // 总帧数

  private _autopaly = false; // 自动播放

  private _disabeld = false;

  private _stepTime = 3000; // 毫秒

  private _timer = null;
  private _modeType = 'stop'; // 'stop':停止;'play':播放;'pause':暂停

  private _marks = null; // 播放轴标记

  // model
  get model() {
    return this._model;
  }
  set model(val) {
    this._model = val;
    this.onModelChange(this._model);
  }



  @Input()
  get frames(): number {
    return this._frames;
  }
  set frames(val: number) {
    this._frames = val;
  }

  @Input()
  get autoplay(): boolean {
    return this._autopaly;
  }
  set autoplay(val: boolean) {
    this._autopaly = val;
  }

  @Input()
  get disabled(): boolean {
    return this._disabeld || !this.frames;
  }
  set disabled(val: boolean) {
    this._disabeld = val;
  }

  @Input()
  get stepTime() {
    return this._stepTime;
  }
  set stepTime(val) {
    this._stepTime = val;
  }

  @Input()
  get marks(): any {
    return this._marks;
  }
  set marks(val: any) {
    this._marks = val;
  }


  @Output()
  onMarkClick: EventEmitter < any > = new EventEmitter()


  @Input()
  frameMsg = null;

  get modeType() {
    return this._modeType;
  }
  set modeType(val) {
    this._modeType = val;
  }

  @HostBinding('class')
  get className() {
    return 'playbar';
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

  ngOnInit() {
    if (this.autoplay) {
      this.play();
    }
  }

  ngOnDestroy() {
    // this.stop();
  }

  back() {
    this.model = 0;
  }

  play() {
    switch (this.modeType) {
      case 'stop':
        this.modeType = 'play';
        this._timer = setInterval(() => {
          if (this.modeType === 'play') {
            this.model++;
            if (this.model < this.frames) {
              // console.log(this.model); // this.dataSet[this.model]
            } else {
              this.stop();
            }
          }
        }, this.stepTime);
        break;
      case 'pause':
        this.modeType = 'play';
        break;
    }
  }
  pause() {
    //console.log('do pause');
    this.modeType = this.modeType === 'pause' ? 'play' : 'pause';
  }
  stop() {
    //console.log('do stop');
    this.modeType = 'stop';
    this.model = 0;
    clearInterval(this._timer);
    this._timer = null;
  }

  markClick(d) {
    this.model = d;
    this.onMarkClick.emit(d);
  }
}
