import { Routes } from '@angular/router';
import { Booking } from './features/booking/booking';
import { Checkout } from './features/checkout/checkout';
import { Confirmation } from './features/confirmation/confirmation';
import { MyBookingsComponent } from './features/my-bookings/my-bookings.component';

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
      path: 'my-bookings',
      component: MyBookingsComponent
    },
    {
        path: '**',
        redirectTo: 'confirmation'
    }
];
