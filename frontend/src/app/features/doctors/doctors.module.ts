import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DoctorsPage } from './pages/doctors-page/doctors-page';
import { DoctorCardComponent } from './components/doctor-card/doctor-card';
import { Filters } from './components/filters/filters';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DoctorsPage,
    DoctorCardComponent,
    Filters
  ],

  exports: [
    DoctorsPage
  ]
})
export class DoctorsModule {}
