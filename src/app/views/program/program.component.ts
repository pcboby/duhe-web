import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

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
