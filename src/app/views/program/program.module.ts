

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
  DatabaseRainfallComponent,
  DatabaseReservoirComponent,
  DatabaseRiversComponent,
  DatabaseStationComponent,
  DatabaseWaterComponent,
  DocumentComponent,
  DatabaseRainfallSearchComponent,
  DatabaseRainfallEditComponent,
  DatabaseRainfallDetailComponent,
  DatabaseStationSearchComponent,
  DatabaseStationEditComponent,
  DatabaseStationDetailComponent,
  DatabaseStationFloodComponent,
  DatabaseStationLevelComponent,
  DatabaseStationCurveComponent,
  DatabaseStationRainfallComponent,
  DatabaseStationWaterComponent
} from './components';
import { ProgramRoutes } from './program.routing';
import { ProgramComponent } from './program.component';

const components = [
  ProgramComponent,
  //
  DatabaseRainfallComponent,
  DatabaseRainfallSearchComponent,
  DatabaseRainfallEditComponent,
  DatabaseRainfallDetailComponent,
  // 
  DatabaseReservoirComponent,
  DatabaseRiversComponent,
  // 
  DatabaseStationComponent,
  DatabaseStationSearchComponent,
  DatabaseStationEditComponent,
  DatabaseStationDetailComponent,
  DatabaseStationFloodComponent,
  DatabaseStationLevelComponent,
  DatabaseStationCurveComponent,
  DatabaseStationRainfallComponent,
  DatabaseStationWaterComponent,
  // 
  DatabaseWaterComponent,
  // 
  DocumentComponent
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
