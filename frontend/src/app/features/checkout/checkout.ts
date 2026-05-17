import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingEntry } from '../../models/bookingEntry';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout implements OnInit {
  booking!: BookingEntry;
  selectedPaymentMethod: 'UPI' | 'creditCard' | 'netBanking' | 'Wallet' | '' = '';
  gst: number = 0;
  platformFee: number = 0;
  totalAmount: number = 0;

  constructor(
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const raw = localStorage.getItem('currentBooking');
    if(!raw) {
      this.router.navigate(['/doctors']);
      return;
    }

    this.booking = JSON.parse(raw);

    const fee = this.booking.consultationFee;

    this.gst = fee * 0.18;
    this.platformFee = fee * 0.05;
    this.totalAmount = fee + this.gst + this.platformFee;
  }
  proceedToPayment(): void {
    this.booking.gst = this.gst;
    this.booking.platformFee = this.platformFee;
    this.booking.amountPaid = this.totalAmount;
    this.booking.paymentMethod = this.selectedPaymentMethod;
    localStorage.setItem('currentBooking', JSON.stringify(this.booking));
    localStorage.setItem('lastBooking', JSON.stringify(this.booking));
    this.router.navigate(['/confirmation']);
  }
}
