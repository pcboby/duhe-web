import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  text = '正在加载...';

  loading = false;

  viewMode = true;

  constructor() {}

  show(text = '正在加载...', viewMode = true) {
    this.text = text;
    this.viewMode = viewMode;
    this.loading = true;
  }

  hide() {
    this.loading = false;
  }

}
