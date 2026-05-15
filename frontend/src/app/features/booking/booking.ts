import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})

export class Booking {
  doctor = {
    name: 'Dr. Jaya Suirya',
    speciality: 'pediatrician',
    consultationFee: 1000,
    image: 'https://static.vecteezy.com/system/resources/thumbnails/024/585/326/small/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png',alt: 'Doctor Image'
  };

  slot = {
    date: '14 May 2026',
    time: '10:30 AM'
  };

  complaint:string = '';
  constructor(private router: Router) {}
  get charCount():number {
    return this.complaint.length;
    }
  continueBooking() {
    if(this.complaint.trim().length<15){
     return;
  }
    localStorage.setItem('complaint', this.complaint);
    localStorage.setItem('doctor', JSON.stringify(this.doctor));
    localStorage.setItem('slot', JSON.stringify(this.slot));
    this.router.navigate(['/booking/confirm']);
  }
}


