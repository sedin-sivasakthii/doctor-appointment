import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export interface Booking{
  id:string;
  userId:string;
  doctorId:string;
  bookingRef:string;
  doctorName:string;
  speciality:string;
  date:string;
  slotTime:string;
  amount:number;
  status:'Confirmed'|'Cancelled'|'Pending';
  complaint?:string;
}
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit{
  bookings:Booking[]=[];
  isLoading=true;
  private readonly STORAGE_KEY='bookingHistory';
  ngOnInit():void{
    this.loadBookings();
  }
  private loadBookings():void{
  this.isLoading=true;
  const data=localStorage.getItem(this.STORAGE_KEY);
  if(data){
    try{
        this.bookings=JSON.parse(data);
    }
    catch(e){
    console.error('Error parsing booking history', e);
      this.bookings=[];
    }
    }
    this.isLoading=false;
  }
  onCancelBooking(id:string):void{
  if (confirm('Are you sure you want to cancel this booking?')){
   this.bookings=this.bookings.map(booking =>{
    if(booking.id === id && booking.status==='Confirmed')
      {
      return {...booking, status: 'Cancelled' as const};
      }
      return booking;
      });
      localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.bookings));
    }
  }
  getStatusClass(status:string):string{
    return `badge-${status.toLowerCase()}`;
  }
}
