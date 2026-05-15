import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Doctor } from '../models/doctor.model';

interface DoctorsResponse {
  success: boolean;
  totalDoctors: number;
  doctors: Doctor[];
}

interface DoctorResponse {
  success: boolean;
  doctor: Doctor;
}

@Injectable({ providedIn: 'root' })
export class DoctorsService {
  private baseUrl = 'http://localhost:3000';
  private selectedDoctorId = '1';

  constructor(private http: HttpClient) {}

  setSelectedDoctorId(id: string): void {
    this.selectedDoctorId = id;
  }

  getSelectedDoctorId(): string {
    return this.selectedDoctorId;
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<DoctorsResponse>(`${this.baseUrl}/doctors`).pipe(
      map(response => response.doctors),
      catchError(err => throwError(() => err))
    );
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<DoctorResponse>(`${this.baseUrl}/doctors/${id}`).pipe(
      map(response => response.doctor),
      catchError(err => throwError(() => err))
    );
  }
}
