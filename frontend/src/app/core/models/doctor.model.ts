import { FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Slot {
  time: string;
  available: boolean;
}

export interface AvailabilityDay {
  date: string;
  slots: Slot[];
}

export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  location: string;
  experience: number;
  consultationFee: number;
  reviews: string[];
  availability: AvailabilityDay[];
}

imports: [
  FormsModule
]