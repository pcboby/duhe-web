import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input()
  dataset: any;

  @Output()
  onItemClick: EventEmitter < any > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onItemClickEmit(item) {
    this.onItemClick.emit(item);
  }

}
