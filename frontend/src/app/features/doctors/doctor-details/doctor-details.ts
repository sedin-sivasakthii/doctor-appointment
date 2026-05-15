import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../../core/services/doctors.service';
import { Doctor } from '../../../core/models/doctor.model';
import { SlotAvailabilityComponent } from '../slot-availabilty/slot-availability.component';

@Component({
  standalone: true,
  selector: 'app-doctor-details',
  imports: [CommonModule, SlotAvailabilityComponent],
  templateUrl: './doctor-details.html',
  styleUrls: ['./doctor-details.css'],
})
export class DoctorDetails implements OnInit {
  doctor: Doctor | null = null;
  reviews: string[] = [];
  loading = true;
  error = '';

  constructor(
    private doctorsService: DoctorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const doctorId = params.get('id') ?? '1';
      this.loadDoctor(doctorId);
    });
  }

  private loadDoctor(id: string): void {
    this.doctorsService.getDoctorById(id).subscribe({
      next: (doctor) => {
        this.doctor = {
          ...doctor,
          image: doctor.image || 'https://randomuser.me/api/portraits/lego/2.jpg',
        };
        this.reviews = doctor.reviews || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load doctor details from the backend.';
        this.loading = false;
      },
    });
  }
}
