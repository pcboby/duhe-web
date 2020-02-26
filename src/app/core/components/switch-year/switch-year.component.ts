import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch-year',
  templateUrl: './switch-year.component.html',
  styleUrls: ['./switch-year.component.css']
})
export class SwitchYearComponent implements OnInit {

  year = null;

  constructor() { }

  ngOnInit() {
  }

}
