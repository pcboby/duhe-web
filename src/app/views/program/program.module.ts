

import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  CoreModule
} from 'src/app/core/core.module';
import {
  PageMessageNewsComponent,
  PageMessageNewsSearchComponent,
  PageDispatchingDataSearchComponent,
  PageDispatchingSchemesComponent,
  PageDispatchingSchemesSearchComponent,
  PageDispatchingDataComponent,
  PageRunningailySearchComponent,
  PageRunningailyComponent,
  PageWaterNewsSearchComponent,
  PageWaterNewsComponent
} from './components';
import { ProgramRoutes } from './program.routing';
import { ProgramComponent } from './program.component';

const components = [
  ProgramComponent,
  //
  PageMessageNewsComponent,
  PageMessageNewsSearchComponent,
  //
  PageWaterNewsComponent,
  PageWaterNewsSearchComponent,
  //
  PageRunningailyComponent,
  PageRunningailySearchComponent,
  //
  PageDispatchingDataComponent,
  PageDispatchingDataSearchComponent,
  //
  PageDispatchingSchemesComponent,
  PageDispatchingSchemesSearchComponent,
  //
  //
];
const services = [];

@NgModule({
  imports: [
    CoreModule,
    ProgramRoutes
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
export class ProgramModule { }
