import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from './ui.component';
import { UiRoutes } from './ui.routing';
import { CoreModule } from 'src/app/core/core.module';

const components = [
  // 
  UiComponent,
  //
];
const services = [];

@NgModule({
  imports: [
    CoreModule,
    UiRoutes
  ],
  providers: [
    ...services
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class UiModule { }
