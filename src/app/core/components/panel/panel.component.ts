import {
  Component,
  OnInit,
  Input,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Input()
  title = '';

  @Input()
  footer = null;

  @Input()
  mode = null;

  constructor() {}

  ngOnInit() {}

  @HostBinding('class')
  get className() {
    const cls = ['panel'];
    if (this.mode) {
      cls.push(this.mode);
    }
    return cls.join(' ');
  }

}
