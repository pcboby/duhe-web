import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-page-system-role-detail',
  templateUrl: './page-system-role-detail.component.html',
  styleUrls: ['./page-system-role-detail.component.css']
})
export class PageSystemRoleDetailComponent implements OnInit {

  @Input()
  dataset: any;

  constructor() {}

  ngOnInit() {}

}
