import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Doctor } from '../../../core/models/doctor.model';
@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }
}