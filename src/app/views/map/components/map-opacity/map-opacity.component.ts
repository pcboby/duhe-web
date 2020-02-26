import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-opacity',
  templateUrl: './map-opacity.component.html',
  styleUrls: ['./map-opacity.component.css']
})
export class MapOpacityComponent implements OnInit {
  opacity = 100;
  disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
