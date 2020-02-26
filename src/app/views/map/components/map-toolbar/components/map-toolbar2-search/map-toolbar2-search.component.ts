import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-map-toolbar2-search',
  templateUrl: './map-toolbar2-search.component.html',
  styleUrls: ['./map-toolbar2-search.component.css']
})
export class MapToolbar2SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @HostBinding('class')
  get className() {
    return 'search-btn';
  }

}
