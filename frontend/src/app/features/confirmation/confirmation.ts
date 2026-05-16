import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface LastBooking {
  bookingRef: string;
  doctorName: string;
  doctorImage: string;
  speciality: string;
  date: string;
  time: string;
  amountPaid: number;
  paymentMethod: string;
}

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})

export class Confirmation implements OnInit {
  booking: LastBooking | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const raw = localStorage.getItem('lastBooking');

    if(!raw) {
      this.router.navigate([('/doctors')]);
      return;
    }

    this.booking = JSON.parse(raw);
    this.clearBookingFlow();
    this.appendToHistory();
  }

  private clearBookingFlow(): void {
    localStorage.removeItem('currentBooking');
  }

  private appendToHistory(): void {
    if(!this.booking) return;
    const raw = localStorage.getItem('bookingHistory');
    const history: LastBooking[] = raw ? JSON.parse(raw) : [];

    const exists = history.some(b => b.bookingRef === this.booking!.bookingRef);
    if(!exists) {
      history.unshift({...this.booking});
      localStorage.setItem('bookingHistory', JSON.stringify(history));
    }
  }

  goToMyBookings(): void {
    this.router.navigate(['/my-bookings']);
  }
}