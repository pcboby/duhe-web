import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-database-rainfall-search',
  templateUrl: './database-rainfall-search.component.html',
  styleUrls: ['./database-rainfall-search.component.css']
})
export class DatabaseRainfallSearchComponent implements OnInit {

  @Output() onsearch: EventEmitter < any > = new EventEmitter();
  @Output() onreset: EventEmitter < any > = new EventEmitter();

  DEFAULT_VALUE_SEARCH_FORM = {
    keyword: [null]
  };
  searchForm: FormGroup; // 查询表单

  constructor(private fromBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fromBuilder.group(this.DEFAULT_VALUE_SEARCH_FORM);
  }

  // 提交查询
  submitForm(e: MouseEvent) {
    e.preventDefault();
    this.onsearch.emit(this.searchForm.value);
  }
  // 重置查询
  resetForm(e: MouseEvent) {
    e.preventDefault();
    this.searchForm.reset();
    this.onsearch.emit(this.searchForm.value);
  }

}
