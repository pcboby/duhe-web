import {
  Component,
  OnInit,
  HostBinding,
  ContentChild,
  TemplateRef,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FixPanelService
} from 'src/app/core/services';

@Component({
  selector: 'app-fix-panel',
  templateUrl: './fix-panel.component.html',
  styleUrls: ['./fix-panel.component.scss']
})
export class FixPanelComponent implements OnInit {

  // private _zIndex = 99;
  private _closed = false;
  private _isPlacement = false;

  private isDown = false;

  private disX; // 记录鼠标点击事件的位置 X
  private disY; // 记录鼠标点击事件的位置 Y
  private totalOffsetX = 0; // 记录总偏移量 X轴
  private totalOffsetY = 0; // 记录总偏移量 Y轴

  // get zIndex() {
  //   return this._zIndex;
  // }
  // set zIndex(val) {
  //   if (!this.isLock) {
  //     this.el.nativeElement.style.zIndex = this.isPlacement ? 9999 : val;
  //   }
  //   this._zIndex = val;
  // }

  @Input()
  get closed() {
    return this._closed;
  }
  set closed(val) {
    this._closed = val;
    // if (!val) {
    //   this.zIndex = this.fixPanel.zIndex++;
    // }
  }

  @Input()
  get isPlacement() {
    return this._isPlacement;
  }
  set isPlacement(val) {
    this._isPlacement = val;
  }

  @Input()
  title = null;

  @Input()
  isLock = false;

  @Input()
  isFixed = true;

  @Input()
  isScroll = false;

  @Input()
  mode = null; // null | 'WHITE' | 'BLACK' | 'BLUE'

  @Output()
  onClose: EventEmitter < any > = new EventEmitter();

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {

    if (this.isLock) {
      return;
    }
    // this.zIndex = this.fixPanel.zIndex++;
    this.setPlacement();

    this.isDown = true;

    this.totalOffsetX = this.el.nativeElement.offsetLeft;
    this.totalOffsetY = this.el.nativeElement.offsetTop;

    this.disX = event.clientX;
    this.disY = event.clientY;
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event) {
    if (this.isLock) {
      return;
    }
    if (this.isDown) {
      this.el.nativeElement.style.left = this.totalOffsetX + event.clientX - this.disX + 'px';
      this.el.nativeElement.style.top = this.totalOffsetY + event.clientY - this.disY + 'px';
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    if (this.isLock) {
      return;
    }
    if (this.isDown) {
      this.totalOffsetX += event.clientX - this.disX;
      this.totalOffsetY += event.clientY - this.disY;
      this.isDown = false;
    }
  }

  @HostBinding('class')
  get className() {
    const cls = ['fix-panel', 'draggable'];
    if (this.isDown) {
      cls.push('isDown');
    }
    if (this.mode) {
      cls.push(this.mode);
    }
    if (this.isScroll) {
      cls.push('isScroll');
    }
    if (this.isLock) {
      cls.push('isLock');
    }
    if (!this.isFixed) {
      cls.push('noFixed');
    }
    if (this.closed) {
      cls.push('hidden');
    }
    return cls.join(' ');
  }

  constructor(private el: ElementRef, private fixPanel: FixPanelService) {}

  ngOnInit() {
    this.setPlacement();
  }

  onCloseEmit() {
    this.closed = !this.closed;
    this.onClose.emit(this.closed);
  }

  setPlacement() {
    this.fixPanel.zIndex += 1;
    this.el.nativeElement.style.zIndex = this.fixPanel.zIndex;
  }


}
