import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoctorDetails } from './features/doctors/doctor-details/doctor-details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DoctorDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
