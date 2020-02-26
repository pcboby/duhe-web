import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-page-flood-simulation',
  templateUrl: './page-flood-simulation.component.html',
  styleUrls: ['./page-flood-simulation.component.css']
})
export class PageFloodSimulationComponent implements OnInit {

  isShow = false;

  stepIdx = 0;

  frames = null;
  stepTime = null;
  frameMarks = null;

  constructor() {}

  ngOnInit() {}

  onChangeFrame(e) {}
  onMarkClick(e){}

}
