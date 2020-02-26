import {
  Injectable
} from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  private config_default = {
    // 'display': 'none',
    'position': 'absolute',
    'bottom': '0',
    'left': '0',
    'pointer-events': 'none',
    'background-color': 'rgba(0,0,0,.65)',
    'color': '#fff',
    'padding': '4px'
  }

  el: any;

  constructor() {}

  create() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);
    // this.core.viewer.container.appendChild(this.el);
    this.el.className = 'arkweb-backdrop';
    this.style();

  }

  private contents(str) {
    this.el.textContent = str;
  }

  private style(options ? ) {
    const opts = _.assign({}, this.config_default, options);
    // tslint:disable-next-line:forin
    for (const e in opts) {
      this.el.style[e] = opts[e];
    }
  }

  show(content, style ? ) {
    const stl = _.assign({
      display: 'block'
    }, style);
    this.contents(content);
    this.style(stl);
  }
  hide() {
    this.style({
      display: 'none'
    });
  }

}
