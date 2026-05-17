import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DoctorsService } from '../../../../core/services/doctors.service';
import { Doctor } from '../../../../core/models/doctor.model';
import { DoctorFilters } from '../../../../core/models/filter.model';
import {
  hasAvailabilityToday,
  hasAvailabilityTomorrow
} from '../../../../shared/utils/availabilty';
import { Filters } from '../../components/filters/filters';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card';

@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [CommonModule, Filters, DoctorCardComponent],
  templateUrl: './doctors-page.html',
  styleUrl: './doctors-page.css',
})
export class DoctorsPage implements OnInit {

  doctors: Doctor[] = [];
  specialities: string[] = [];
  locations: string[] = [];
  filteredDoctors: Doctor[] = [];
  loading = false;
  error = '';

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(private doctorsService: DoctorsService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchDoctors();
    }
  }

  fetchDoctors(): void {
    this.loading = true;
    this.error = '';

    this.doctorsService.getDoctors().subscribe({
      next: (response) => {
        this.doctors = response;
        this.filteredDoctors = response;
        this.loading = false;
        this.extractFilters();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
        this.error = 'Failed to load doctors. Please refresh the page.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private extractFilters(): void {
    this.specialities = [
      ...new Set(this.doctors.map(doctor => doctor.speciality))
    ];
    this.locations = [
      ...new Set(this.doctors.map(doctor => doctor.location))
    ];
  }

  applyFilters(filters: DoctorFilters): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch =
        doctor.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesSpeciality =
        filters.speciality === '' ||
        doctor.speciality === filters.speciality;

      const matchesLocation =
        filters.location === '' ||
        doctor.location === filters.location;

      const matchesFee =
        filters.maxFee === 0 || doctor.consultationFee <= filters.maxFee;

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

