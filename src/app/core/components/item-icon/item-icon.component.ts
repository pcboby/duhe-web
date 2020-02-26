import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-icon',
  templateUrl: './item-icon.component.html',
  styleUrls: ['./item-icon.component.scss']
})
export class ItemIconComponent implements OnInit {

  @Input()
  type = null;

  @Input()
  label = null;

  @Input()
  width = "5em";

  constructor() { }

  ngOnInit() {
  }

}
