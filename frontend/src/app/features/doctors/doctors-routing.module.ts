import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsPage } from './pages/doctors-page/doctors-page';
import { DoctorDetails } from './doctor-details/doctor-details';

const routes: Routes = [
  { path: '', component: DoctorsPage },
  { path: ':id', component: DoctorDetails }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
