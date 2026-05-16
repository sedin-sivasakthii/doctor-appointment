import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface LastBooking {
  bookingRef: string;

  doctorName: string;
  speciality: string;
  doctorImage: string;

  date: string;
  time: string;

  complaint: string;

  consultationFee: number;
  gst: number;
  platformFee: number;
  amountPaid: number;

  paymentMethod: string;

  bookedAt: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})

export class Booking implements OnInit{
  generatedBookingRef: string = '';

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

  ngOnInit(): void {
    this.generatedBookingRef = this.generateBookingRef();
  }

  generateBookingRef(): string {
    return "DOC-" + Date.now();
  }

  complaint:string = '';
  constructor(private router: Router) {}
  get charCount():number {
    return this.complaint.length;
    }
  continueBooking() {
    if(this.complaint.trim().length < 10)
      return;

    const booking = {
      bookingRef: this.generatedBookingRef,

      doctorName: this.doctor.name,
      speciality: this.doctor.speciality,
      doctorImage: this.doctor.image,

      date: this.slot.date,
      time: this.slot.time,

      complaint: this.complaint,
      consultationFee: this.doctor.consultationFee,

      gst: 0,
      platformFee: 0,
      amountPaid: 0,

      paymentMethod: '',
      bookedAt: new Date().toISOString()
    };

    localStorage.setItem('currentBooking', JSON.stringify(booking));
    this.router.navigate(['/checkout']);
  }
}


