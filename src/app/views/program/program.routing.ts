import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './program.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramComponent
  },
];

export const ProgramRoutes = RouterModule.forChild(routes);
