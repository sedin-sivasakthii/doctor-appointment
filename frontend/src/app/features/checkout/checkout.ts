import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  doctor: any;
  slot: any
  complaint: string = '';
  selectedPaymentMethod: string = '';
  gst: number = 0;
  platformFee: number = 0;
  TotalAmount: number = 0;
  ngOnInit(): void {
    const doctorData = localStorage.getItem('doctor');
    if(doctorData) {
      this.doctor = JSON.parse(doctorData);
      const fee = this.doctor.consultationFee;
      this.gst = fee * 0.18;
      this.platformFee = fee * 0.05;
      this.TotalAmount = fee + this.gst + this.platformFee;
    }
  }
  proceedToPayment(){
    alert('Payment Successful');
    localStorage.removeItem('doctor');
  }
}
