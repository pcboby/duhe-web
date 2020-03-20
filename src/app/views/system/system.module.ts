

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
  PageSystemRoleDetailComponent,
  PageSystemRoleEditComponent,
  PageSystemRoleSearchComponent,
  PageSystemObjectComponent,
  PageSystemObjectDetailComponent,
  PageSystemObjectEditComponent,
  PageSystemObjectSearchComponent,
  PageSystemModuleComponent,
  PageSystemModuleDetailComponent,
  PageSystemModuleEditComponent,
  PageSystemModuleSearchComponent,
  PageSystemModelComponent,
  PageSystemModelDetailComponent,
  PageSystemModelEditComponent,
  PageSystemModelSearchComponent,
  PageSystemLogComponent,
  PageSystemLogSearchComponent,
  PageSystemObjectTreeComponent,
  PageSystemModuleTreeComponent,
  PageSystemModelTreeComponent,
  PageSystemUserComponent,
  SystemUserDetailComponent,
  SystemUserEditComponent,
  SystemUserSearchComponent,
  PageSystemRoleComponent
} from './components';
import { SystemRoutes } from './system.routing';
import { SystemComponent } from './system.component';

const components = [
  // 
  SystemComponent,
  //
  PageSystemUserComponent,
  SystemUserDetailComponent,
  SystemUserEditComponent,
  SystemUserSearchComponent,
  // 
  PageSystemRoleComponent,
  PageSystemRoleDetailComponent,
  PageSystemRoleEditComponent,
  PageSystemRoleSearchComponent,
  //
  PageSystemObjectComponent,
  PageSystemObjectDetailComponent,
  PageSystemObjectEditComponent,
  PageSystemObjectSearchComponent,
  PageSystemObjectTreeComponent,
  //
  PageSystemModuleComponent,
  PageSystemModuleDetailComponent,
  PageSystemModuleEditComponent,
  PageSystemModuleSearchComponent,
  PageSystemModuleTreeComponent,
  //
  PageSystemModelComponent,
  PageSystemModelDetailComponent,
  PageSystemModelEditComponent,
  PageSystemModelSearchComponent,
  PageSystemModelTreeComponent,
  //
  PageSystemLogComponent,
  PageSystemLogSearchComponent
  //
];
const services = [];

@NgModule({
  imports: [
    CoreModule,
    SystemRoutes
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
export class SystemModule { }
