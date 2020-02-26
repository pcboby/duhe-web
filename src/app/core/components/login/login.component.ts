import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  environment
} from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  productName = environment.productName;
  productVersion = environment.productVersion;
  productCopyright = environment.productCopyright;

  passwordVisible = false;

  DEFAULT_VALUE_SEARCH_FORM = {
    username: [null],
    password: [null],
    remember: [false]
  };

  validateForm: FormGroup; // 查询表单

  constructor(private router: Router, private fromBuilder: FormBuilder) {}

  ngOnInit() {
    this.validateForm = this.fromBuilder.group(this.DEFAULT_VALUE_SEARCH_FORM);
  }

  @HostBinding('class')
  get className() {
    return 'login';
  }
  // 提交查询
  submitForm(e: MouseEvent) {
    this.router.navigate(['/map']);
  }

}
