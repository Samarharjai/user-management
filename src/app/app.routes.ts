import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
