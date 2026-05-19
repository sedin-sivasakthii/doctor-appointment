import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { LoginResponse, RegisterResponse, User } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiAuthUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(data: { email: string; password: string }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, data)
      .pipe(
        tap((res) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', res.token);
            localStorage.setItem('currentUser', JSON.stringify(res.user));
          }
        })
      );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/register`,
      data
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }

    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }

    return null;
  }

  getUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user && user !== 'undefined') {
        try {
          return JSON.parse(user);
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          return null;
        }
      }
    }

    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
}