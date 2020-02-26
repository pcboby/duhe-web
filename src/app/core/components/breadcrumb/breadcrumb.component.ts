import {
  NavigationService
} from 'src/app/core/services';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  get mas() {
    return this.nav.master.find(item => this.nav.selected_master === item.value).name;
  }

  get path() {
    return this.nav.selectedPath;
  }
  constructor(private nav: NavigationService) {}


  ngOnInit() {}

}
