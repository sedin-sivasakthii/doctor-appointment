import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingEntry } from '../../models/bookingEntry';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit{
  bookings:BookingEntry[]=[];
  isLoading:boolean =true;
  private readonly STORAGE_KEY='bookingHistory';

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {}

  ngOnInit():void{
    if(!isPlatformBrowser(this.platformId))
      return;

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
