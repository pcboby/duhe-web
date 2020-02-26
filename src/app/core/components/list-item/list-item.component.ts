import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()
  label = null;
  @Input()
  subLabel = null;

  @Input()
  showOpen = true;

  @Input()
  opend = false;

  constructor() {}

  ngOnInit() {}

  toggle() {
    if (this.showOpen) {
      this.opend = !this.opend;
    }
  }

}
