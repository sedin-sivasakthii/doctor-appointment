import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-details',
  imports: [CommonModule],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css',
})
export class DoctorDetails {
  doctor = {
    name: 'Dr. Priya Raman',
    speciality: 'Cardiology',
    location: 'Chennai',
    experience: 8,
    rating: 4.6,
    reviewCount: 128,
    fee: 800,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    about: `Dr. Priya Raman is a renowned Cardiologist with 8+ years of experience in treating heart-related diseases.
    She specializes in preventive cardiology and heart health management.`
  };
 
  reviews = [
    { name: 'Ramesh K', rating: 5, comment: 'Very good experience. Explained everything clearly.' },
    { name: 'Anita S', rating: 4, comment: 'Doctor is very friendly and helpful.' },
    { name: 'Vikram P', rating: 5, comment: 'Great experience. Highly recommended.' }
  ];
}
