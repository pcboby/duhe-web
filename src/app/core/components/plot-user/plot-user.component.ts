import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-plot-user',
  templateUrl: './plot-user.component.html',
  styleUrls: ['./plot-user.component.css']
})
export class PlotUserComponent implements OnInit {

  @Input()
  dataset: any;

  constructor() {}

  ngOnInit() {}

}
