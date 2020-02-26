import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  productName = environment.productName;
  productVersion = environment.productVersion;
  productCopyright = environment.productCopyright;

  constructor() { }

  ngOnInit() {
  }

}
