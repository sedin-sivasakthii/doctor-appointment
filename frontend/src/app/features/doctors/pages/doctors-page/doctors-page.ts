import { Component , OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { Doctor } from '../../../../core/models/doctor.model';
import { DoctorFilters } from '../../../../core/models/filter.model';
import {
  hasAvailabilityToday,
  hasAvailabilityTomorrow
} from '../../../../shared/utils/availabilty';
import { CommonModule } from '@angular/common';
import { DoctorCard } from '../../components/doctor-card/doctor-card';
import { Filters } from '../../components/filters/filters';

@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [CommonModule, DoctorCard, Filters],
  templateUrl: './doctors-page.html',
  styleUrl: './doctors-page.css',
})
export class DoctorsPage implements OnInit {
  
  doctors: Doctor[] = [];
  specialities: string[] = [];
  locations: string[] = [];

  filteredDoctors: Doctor[] = [];
  private currentFilters: DoctorFilters = {
    search: '',
    speciality: '',
    location: '',
    availability: '',
    maxFee: 2000
  };

  constructor(private doctorsService: DoctorsService) {}
  
  ngOnInit(): void {
    this.fetchDoctors();
  }
  fetchDoctors() :void {
    this.doctorsService.getDoctors()
    .subscribe({
      next: (response) => {
        this.doctors.splice(0, this.doctors.length, ...response);
        this.specialities.splice(
          0,
          this.specialities.length,
          ...new Set(this.doctors.map(doctor => doctor.speciality))
        );
        this.locations.splice(
          0,
          this.locations.length,
          ...new Set(this.doctors.map(doctor => doctor.location))
        );
        this.applyFilters(this.currentFilters);
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
      }
    });
  }
  onFiltersChanged(filters: DoctorFilters): void {
    this.currentFilters = {
      ...filters,
      maxFee: Number(filters.maxFee) || 0
    };
    this.applyFilters(this.currentFilters);
  }

  private applyFilters(filters: DoctorFilters): void {
    const filtered = this.doctors.filter(doctor => {
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
        filters.maxFee === 0 ||
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
    this.filteredDoctors.splice(0, this.filteredDoctors.length, ...filtered);
}
}

