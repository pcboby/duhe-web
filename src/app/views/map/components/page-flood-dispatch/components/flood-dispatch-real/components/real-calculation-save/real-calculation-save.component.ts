import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-real-calculation-save',
  templateUrl: './real-calculation-save.component.html',
  styleUrls: ['./real-calculation-save.component.css']
})
export class RealCalculationSaveComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      remember: [true]
    });
  }

}
