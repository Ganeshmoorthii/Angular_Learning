import { Routes } from '@angular/router';
import { LoginPageComponent } from './feature/auth/login-page/login-page.component';
import { HomePageComponent } from './feature/dashboard/home-page/home-page.component';
import { RegisterPageComponent } from './feature/auth/register-page/register-page.component';
import { authGuard } from './core/guards/auth.guard';
import { DisplayPageComponent } from './feature/dashboard/display-page/display-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DisplayPageComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
