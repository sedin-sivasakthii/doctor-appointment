import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlotAvailabilityComponent } from "./features/doctors/slot-availabilty/slot-availability.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SlotAvailabilityComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
