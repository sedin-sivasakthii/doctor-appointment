import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Doctor } from '../../../../core/models/doctor.model';

import {
  getNextAvailableSlots
} from '../../../../shared/utils/availabilty';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-card.html',
  styleUrls: ['./doctor-card.css']
})
export class DoctorCardComponent {

  @Input() doctor!: Doctor;

  getNextAvailable(): string {
    return getNextAvailableSlots(this.doctor.availability);
  }

}