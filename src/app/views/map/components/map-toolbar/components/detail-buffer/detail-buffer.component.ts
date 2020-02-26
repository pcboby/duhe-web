import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-buffer',
  templateUrl: './detail-buffer.component.html',
  styleUrls: ['./detail-buffer.component.css']
})
export class DetailBufferComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      size: [10]
    });
  }

}
