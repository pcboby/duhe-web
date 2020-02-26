import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-system-user-detail',
  templateUrl: './system-user-detail.component.html',
  styleUrls: ['./system-user-detail.component.css']
})
export class SystemUserDetailComponent implements OnInit {

  @Input()
  dataset: any;

  constructor() { }

  ngOnInit() {
  }

}
