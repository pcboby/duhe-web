import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavigationService
} from 'src/app/core/services';
import {
  MapService
} from '../../core/services/local/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


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



  constructor(private nav: NavigationService, private map: MapService) {}

  ngOnInit() {}


}
