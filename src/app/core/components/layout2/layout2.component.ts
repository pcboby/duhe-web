import { Component, OnInit } from '@angular/core';
import { LayoutService, NavigationService } from '../../services';

@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.css']
})
export class Layout2Component implements OnInit {

  
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
