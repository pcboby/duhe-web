import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RealCalculationResultsComponent } from './components/real-calculation-results/real-calculation-results.component';
import { RealCalculationSaveComponent } from './components/real-calculation-save/real-calculation-save.component';

@Component({
  selector: 'app-flood-dispatch-real',
  templateUrl: './flood-dispatch-real.component.html',
  styleUrls: ['./flood-dispatch-real.component.css']
})
export class FloodDispatchRealComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  // 提交计算
  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    const m = this.modalService.create({
      nzTitle: '计算结果',
      nzContent: RealCalculationResultsComponent,
      nzWidth: 920,
      nzFooter: [{
        label: '保存计算结果',
        type: 'primary',
        onClick: (scope) => {
          // const params = scope.validateForm.value;
          this.saveResult();
        }
      }, {
        label: '取消',
        onClick: () => {
          m.close();
        }
      }]
    });

  }
  // 保存计算结果
  saveResult(d?) {
    const m = this.modalService.create({
      nzTitle: '结果保存',
      nzContent: RealCalculationSaveComponent,
      nzFooter: [{
        label: '保存',
        type: 'primary',
        onClick: (scope) => {
          m.close();
        }
      }, {
        label: '取消',
        onClick: () => {
          m.close();
        }
      }]
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
}
