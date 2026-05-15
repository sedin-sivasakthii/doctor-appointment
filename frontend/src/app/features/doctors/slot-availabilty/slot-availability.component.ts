import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AvailabilityDay, Slot } from '../../../core/models/doctor.model';
 
@Component({
  selector: 'app-slot-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-availability.component.html',
  styleUrls: ['./slot-availability.component.css']
})

export class SlotAvailabilityComponent implements OnChanges {
  @Input() availability: AvailabilityDay[] = [];

  selectedDate = '';
  selectedAvailability: AvailabilityDay | null = null;
  selectedSlot: Slot | null = null;
  confirmationMessage = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availability']) {
      this.availability = changes['availability'].currentValue ?? [];
      if (this.availability.length) {
        this.selectDay(this.availability[0]);
      } else {
        this.resetSelection();
      }
    }
  }

  private resetSelection(): void {
    this.selectedAvailability = null;
    this.selectedDate = '';
    this.selectedSlot = null;
    this.confirmationMessage = '';
  }

  get slots(): Slot[] {
    return this.selectedAvailability?.slots ?? [];
  }

  selectDay(day: AvailabilityDay): void {
    this.selectedAvailability = day;
    this.selectedDate = this.formatDate(day.date);
    this.selectedSlot = null;
    this.confirmationMessage = '';
  }

  selectSlot(slot: Slot): void {
    if (!slot.available) {
      return;
    }
    this.selectedSlot = slot;
    this.confirmationMessage = `Slot ${slot.time} selected. Click Book appointment to confirm.`;
  }

  bookAppointment(): void {
    if (!this.selectedSlot) {
      return;
    }
    this.selectedSlot.available = false;
    this.confirmationMessage = `Appointment Booked for ${this.selectedSlot.time}`;
    this.selectedSlot = null;
  }

  formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }
}
