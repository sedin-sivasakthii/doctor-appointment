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
        this.applyLocalStorageBookings();
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

  private applyLocalStorageBookings(): void {
    if (!this.doctor) return;

    const raw = localStorage.getItem('bookedSlots');
    if (raw) {
      try {
        const bookedSlots: Array<{ doctorId: number; date: string; slotTime: string }> = JSON.parse(raw);
        this.doctor.availability.forEach((day) => {
          day.slots.forEach((slot) => {
            const isBooked = bookedSlots.some(
              (bs) =>
                bs.doctorId === this.doctor!.id &&
                bs.date === day.date &&
                bs.slotTime === slot.time
            );
            if (isBooked) {
              slot.available = false;
            }
          });
        });
      } catch (e) {
        console.error('Error parsing booked slots', e);
      }
    }
  }
}
