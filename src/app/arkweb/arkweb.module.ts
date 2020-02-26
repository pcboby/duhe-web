import { NgModule } from '@angular/core';
import { ArkwebComponent, ArkwebResourceComponent, ArkwebSwitchToComponent, ArkwebOpacityComponent } from './components';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgZorroAntdModule
];
const components = [
  ArkwebComponent,
  ArkwebResourceComponent,
  ArkwebSwitchToComponent,
  ArkwebOpacityComponent
];
const services = [];

@NgModule({
  imports: [
    modules
  ],
  exports: [
    ...components
  ],
  declarations: [...components]
})
export class ArkwebModule { }
