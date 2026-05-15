import { Routes } from '@angular/router';
import { DoctorDetails } from './features/doctors/doctor-details/doctor-details';

export const routes: Routes = [
  { path: '', redirectTo: 'doctors/1', pathMatch: 'full' },
  { path: 'doctors/:id', component: DoctorDetails },
];
