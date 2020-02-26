import { Injectable } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  get slider_isHidden() {
    return !this.nav.sub;
  }

constructor(private nav: NavigationService) { }

}
