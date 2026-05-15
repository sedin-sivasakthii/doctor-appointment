import { Routes } from '@angular/router';
import { Booking } from './features/booking/booking';
import { Checkout } from './features/checkout/checkout';

export const routes: Routes = [
  {
    path: 'booking',
    component: Booking
  },
  {
    path: 'booking/confirm',
    component: Checkout
  }
];