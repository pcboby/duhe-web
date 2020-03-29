import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar2',
  templateUrl: './toolbar2.component.html',
  styleUrls: ['./toolbar2.component.scss']
})
export class Toolbar2Component implements OnInit {

  @Input()
  dataset = null;

  @Input()
  selected = null;

  @Output()
  onItemClick: EventEmitter < any > = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  itemClick(event) {
    this.onItemClick.emit(event);
  }

}
