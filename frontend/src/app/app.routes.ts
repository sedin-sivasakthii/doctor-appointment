import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'my-bookings',
    loadChildren: () => import('./features/my-bookings/my-bookings.module').then(m => m.MyBookingsModule)
  }
];
