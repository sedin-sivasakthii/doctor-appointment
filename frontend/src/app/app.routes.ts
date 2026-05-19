import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Booking } from './features/booking/booking';
import { Checkout } from './features/checkout/checkout';
import { Confirmation } from './features/confirmation/confirmation';
import { MyBookingsComponent } from './features/my-bookings/my-bookings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'doctors', pathMatch: 'full' },

  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth-routing.module')
      .then(m => m.AuthRoutingModule)
  },

  {
    path: 'doctors',
    loadChildren: () =>
      import('./features/doctors/doctors.module')
      .then(m => m.DoctorsModule)
  },

  {
    path: 'booking',
    canActivate: [authGuard],
    component: Booking
  },

  {
    path: 'checkout',
    canActivate: [authGuard],
    component: Checkout
  },

  {
    path: 'confirmation',
    canActivate: [authGuard],
    component: Confirmation
  },

  {
    path: 'my-bookings',
    canActivate: [authGuard],
    component: MyBookingsComponent
  },

  {
    path: '**',
    redirectTo: 'doctors'
  }
];
