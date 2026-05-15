import { Component , OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { Doctor } from '../../../../core/models/doctor.model';
import { DoctorFilters } from '../../../../core/models/filter.model';
import {
  hasAvailabilityToday,
  hasAvailabilityTomorrow
} from '../../../../shared/utils/availabilty';
import { CommonModule } from '@angular/common';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card';
import { Filters } from '../../components/filters/filters';

@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [CommonModule, DoctorCardComponent, Filters],
  templateUrl: './doctors-page.html',
  styleUrl: './doctors-page.css',
})
export class DoctorsPage implements OnInit {
  
  doctors: Doctor[] = [];
  specialities: string[] = [];

  locations: string[] = [];

  filteredDoctors: Doctor[] = [];
  loading = false;

  constructor(private doctorsService: DoctorsService) {}
  
  ngOnInit(): void {
    this.fetchDoctors();
  }
  fetchDoctors() :void {
    this.loading = true;

    this.doctorsService.getDoctors()
    .subscribe({
      next: (response) => {
        this.doctors = response;
        this.filteredDoctors = response;
        this.specialities = [
          ...new Set(this.doctors.map(doctor => doctor.speciality))
        ];
        this.locations = [
          ...new Set(this.doctors.map(doctor => doctor.location))
        ];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
        this.loading = false;
      }
    });
  }
  applyFilters(filters: DoctorFilters): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch =
        doctor.name
          .toLowerCase()
          .includes(
            filters.search.toLowerCase()
          );

      

      const matchesSpeciality =
        filters.speciality === '' ||
        doctor.speciality === filters.speciality;

     

      const matchesLocation =
        filters.location === '' ||
        doctor.location === filters.location;

      

      const matchesFee =
        doctor.consultationFee <= filters.maxFee;
      let matchesAvailability = true;
      
      if (filters.availability === 'today') {
        matchesAvailability = hasAvailabilityToday(doctor.availability);
      } else if (filters.availability === 'tomorrow') {
        matchesAvailability = hasAvailabilityTomorrow(doctor.availability);
      }

      return (
        matchesSearch &&
        matchesSpeciality &&
        matchesLocation &&
        matchesFee &&
        matchesAvailability

      );
    });
}
}

