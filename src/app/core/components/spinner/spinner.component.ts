import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  get viewMode() {
    return this.loader.viewMode;
  }

  get loading() {
    return this.loader.loading;
  }

  get text() {
    return this.loader.text;
  }

  constructor(private loader: SpinnerService) { }

  ngOnInit() {
  }

}
