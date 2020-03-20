import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  LayoutComponent,
  LoginComponent,
  ErrorComponent,
  Login2Component
} from './core/components';

const routes: Routes = [{
  path: '', // 默认
  redirectTo: 'map',
  pathMatch: 'full'
}, {
  path: 'error', // 出错页
  component: ErrorComponent
}, {
  path: 'login', // 登录
  component: Login2Component
}, {
  path: 'map',
  component: LayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./views/map/map.module').then(m => m.MapModule),
    // canActivate: [AuthIntercepterService]
  }]
}, {
  path: 'program',
  component: LayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./views/program/program.module').then(m => m.ProgramModule),
    // canActivate: [AuthIntercepterService]
  }]
}, {
  path: 'system',
  component: LayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./views/system/system.module').then(m => m.SystemModule),
    // canActivate: [AuthIntercepterService]
  }]
}, {
  path: '**', // 路由判定
  redirectTo: 'error',
  pathMatch: 'full'
}];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutes {}
