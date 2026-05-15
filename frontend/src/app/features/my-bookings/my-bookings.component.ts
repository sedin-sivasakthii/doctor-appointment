import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyBookingsService } from './my-bookings.service';
import { Booking } from './booking.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  standalone: false
})
export class MyBookingsComponent implements OnInit, OnDestroy {
  bookings: Booking[] = [];
  isLoading = true;
  private subscription: Subscription = new Subscription();

  constructor(private bookingsService: MyBookingsService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.bookingsService.getBookings().subscribe({
        next: (data) => {
          this.bookings = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load bookings', err);
          this.isLoading = false;
        }
      })
    );
  }

  onCancelBooking(id: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingsService.cancelBooking(id).subscribe({
        next: () => {
          // Success handled by service updating the subject
        },
        error: (err) => alert('Failed to cancel booking. Please try again.')
      });
    }
  }

  getStatusClass(status: string): string {
    return `badge-${status.toLowerCase()}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
