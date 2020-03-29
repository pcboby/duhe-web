import { Routes, RouterModule } from '@angular/router';
import { UiComponent } from './ui.component';

const routes: Routes = [
  {
    path: '',
    component: UiComponent
  },
];

export const UiRoutes = RouterModule.forChild(routes);
