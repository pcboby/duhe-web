import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/local/navigation/navigation.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {


  // 主选
  get mas() {
    return this.nav.selected_master;
  }
  // 次选
  get sub() {
    return this.nav.selected_sub;
  }

  get path() {
    return this.nav.selectedPath;
  }

  get mapDisabled() {
    return this.nav.mapDisabeld;
  }



  constructor(private nav: NavigationService) {}

  ngOnInit() {}

}