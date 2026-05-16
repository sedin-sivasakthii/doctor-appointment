import { Routes } from '@angular/router';
import { Booking } from './features/booking/booking';
import { Checkout } from './features/checkout/checkout';
import { Confirmation } from './features/confirmation/confirmation';

export const routes: Routes = [
  {
    path: 'booking',
    component: Booking
  },
  {
    path: 'checkout',
    component: Checkout
  },
  {
        path: 'confirmation',
        component: Confirmation
    },
    {
        path: 'doctors',
        component: Confirmation
    },
    {
        path: '**',
        redirectTo: 'confirmation'
    }
];
