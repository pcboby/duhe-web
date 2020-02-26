import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavigationService
} from '../../services';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = {
    // photo: 'http://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'administrator'
  };

  get menu() {
    return this.nav.master;
  }

  get selected() {
    return this.nav.selected_master;
  }
  set selected(val) {
    this.nav.selected_master = val;
    this.setSubDefaultSelected();
  }

  set path(val) {
    this.nav.selectedPath = val;
  }
  get path() {
    return this.nav.selectedPath;
  }

  constructor(private router: Router, private nav: NavigationService) {}

  ngOnInit() {
    if (!this.nav.selected_sub) {
      this.setSubDefaultSelected();
    }
  }

  setSubDefaultSelected() {
    const M = this.menu.find(item => item.value === this.selected);
    if (M.children) {
      const p = this.nav.getDefaultPath({
        data: M,
        path: []
      });
      this.path = p.path;
      this.nav.selected_sub = p.path[p.path.length - 1].value;
    } else {
      this.nav.selected_sub = null;
    }
  }


  // 登出
  logout() {
    this.router.navigate(['/login']);
  }


}
