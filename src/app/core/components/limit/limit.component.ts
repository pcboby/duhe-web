import {
  Component,
  OnInit,
  Input,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.css']
})
export class LimitComponent implements OnInit {

  @Input()
  label = null;

  @Input()
  dataset = [];

  constructor() {}

  ngOnInit() {}

  @HostBinding('class')
  get className() {
    return 'group-limit';
  }

}
