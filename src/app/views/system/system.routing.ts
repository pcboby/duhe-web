import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent
  },
];

export const SystemRoutes = RouterModule.forChild(routes);
