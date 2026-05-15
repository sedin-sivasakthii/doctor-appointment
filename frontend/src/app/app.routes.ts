import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth-routing.module')
      .then(m => m.AuthRoutingModule)
  },

  {
    path: 'doctors',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/doctors/doctors.module')
      .then(m => m.DoctorsModule)
  }
];