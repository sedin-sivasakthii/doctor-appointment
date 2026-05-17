import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DoctorsService } from '../../../core/services/doctors.service';
import { Doctor } from '../../../core/models/doctor.model';
import { SlotAvailabilityComponent } from '../slot-availabilty/slot-availability.component';

@Component({
  standalone: true,
  selector: 'app-doctor-details',
  imports: [CommonModule, SlotAvailabilityComponent, RouterModule],
  templateUrl: './doctor-details.html',
  styleUrls: ['./doctor-details.css'],
})
export class DoctorDetails implements OnInit {
  doctor: Doctor | null = null;
  reviews: string[] = [];
  loading = true;
  error = '';

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private doctorsService: DoctorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.paramMap.subscribe((params) => {
        const doctorId = params.get('id') ?? '1';
        this.loadDoctor(doctorId);
      });
    }
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
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load doctor details from the backend.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
