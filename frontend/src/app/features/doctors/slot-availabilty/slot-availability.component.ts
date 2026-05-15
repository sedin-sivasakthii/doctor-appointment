import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
 
@Component({

  selector: 'app-slot-availability',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './slot-availability.component.html',

  styleUrls: ['./slot-availability.component.css']

})


export class SlotAvailabilityComponent {  // correct spelling
 
  selectedDate = 'Today, 14 May';
  selectedSlot:any=null;
  confirmationMessage='';
 
  slots = [

    { time: '09:00 AM', status: 'available' },

    { time: '09:30 AM', status: 'available' },

    { time: '10:00 AM', status: 'available' },

    { time: '10:30 AM', status: 'available' },

    { time: '11:00 AM', status: 'booked' },

    { time: '11:30 AM', status: 'available' },

    { time: '12:00 PM', status: 'available' },

    { time: '12:30 PM', status: 'available' },

    { time: '01:00 PM', status: 'booked' },

    { time: '01:30 PM', status: 'available' }

  ];
   get availableSlots() {
    return this.slots
  }

  selectSlot(slot: any) {

    if (slot.status === 'booked') 
      return;
      this.selectedSlot=slot;
      this.confirmationMessage=`Slot ${slot.time} Seclected.. Click Book appointment to confirm `
     

    } 
  bookAppintment(){
      if(!this.selectedSlot)
        return;
      this.selectedSlot.status='booked';
      this.confirmationMessage=`Appointment Booked for ${this.selectedSlot.time}`
      this.selectedSlot=null;

    }

  }


 
