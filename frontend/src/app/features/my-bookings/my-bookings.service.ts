import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyBookingsService {
  private readonly STORAGE_KEY = 'bookingHistory';
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);

  constructor() {
    this.loadBookings();
  }

  getBookings(): Observable<Booking[]> {
    return this.bookingsSubject.asObservable();
  }

  private loadBookings(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        const bookings = JSON.parse(data);
        this.bookingsSubject.next(bookings);
      } catch (e) {
        console.error('Error parsing booking history', e);
        this.bookingsSubject.next([]);
      }
    } else {
      this.bookingsSubject.next([]);
    }
  }

  cancelBooking(bookingId: string): Observable<boolean> {
    const currentBookings = this.bookingsSubject.value;
    const updatedBookings = currentBookings.map(booking => {
      if (booking.id === bookingId && booking.status === 'Confirmed') {
        return { ...booking, status: 'Cancelled' as const };
      }
      return booking;
    });

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBookings));
    this.bookingsSubject.next(updatedBookings);
    return of(true);
  }
}
