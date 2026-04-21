import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'reportar',
    loadComponent: () => import('./pages/reportar/reportar.component').then(m => m.ReportarComponent)
  },
  {
    path: 'resultado',
    loadComponent: () => import('./pages/resultado/resultado.component').then(m => m.ResultadoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
