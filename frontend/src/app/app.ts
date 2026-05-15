import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlotAvailabilityComponent } from "./features/doctors/slot-availabilty/slot-availability.component";
import { DoctorDetails } from './features/doctors/doctor-details/doctor-details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DoctorDetails,SlotAvailabilityComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
