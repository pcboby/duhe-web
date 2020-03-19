import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {

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

  // 提交查询
  submitForm(e: MouseEvent) {
    this.router.navigate(['/map']);
  }

}
