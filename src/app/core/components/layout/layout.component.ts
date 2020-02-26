import { Component, OnInit } from '@angular/core';
import { NavigationService, LayoutService } from '../../services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  get slider_isHidden() {
    return this.layout.slider_isHidden;
  }

  get mapDisabeld() {
    return this.nav.mapDisabeld;
  }

  get predictionVisabled() {
    return this.nav.predictionVisabled;
  }

  constructor(private layout: LayoutService, private nav: NavigationService) { }

  ngOnInit() {
  }

}
