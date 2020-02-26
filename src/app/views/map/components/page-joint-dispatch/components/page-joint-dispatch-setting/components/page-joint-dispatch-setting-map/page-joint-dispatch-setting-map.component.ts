import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiAreaService
} from 'src/app/core/services';

@Component({
  selector: 'app-page-joint-dispatch-setting-map',
  templateUrl: './page-joint-dispatch-setting-map.component.html',
  styleUrls: ['./page-joint-dispatch-setting-map.component.css']
})
export class PageJointDispatchSettingMapComponent implements OnInit {

  label = null;
  dataset = null;

  constructor(private api: ApiAreaService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getJson().subscribe(res => {
      console.log(res);

      this.label = res.label;
      this.dataset = res.data;
    });
  }

}
