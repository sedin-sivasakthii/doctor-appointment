import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Doctor } from '../../../core/models/doctor.model';
@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private apiUrl = 'http://localhost:3000/doctors';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
   return this.http.get<{ doctors: Doctor[] }>(this.apiUrl).pipe(
  map(response => response?.doctors ?? [])
);
  }
}
