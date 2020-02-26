import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavigationService
} from '../../services';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  get selected() {
    return this.nav.selected_sub;
  }
  set selected(val) {
    this.nav.selected_sub = val;
  }

  get menu(): any {
    return this.nav.sub;
  }

  get selectedPath() {
    return this.nav.selectedPath;
  }
  set selectedPath(val){
    this.nav.selectedPath = val;
  }

  constructor(private nav: NavigationService) {}

  ngOnInit() {}

  traceChildSelected(d) {
    return this.selectedPath.find(item => item.value === d.value);
  }

  itemClick(data, path) {
    console.log(data)
    if (data.children) {
      data.isOpen = !data.isOpen;
    } else {
      this.selected = data.value;
      this.selectedPath = this.getPath(path, data);

    }
  }
  getPath(a, b) {
    return [...a, b];
  }

}
