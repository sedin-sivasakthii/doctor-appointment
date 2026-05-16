import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { LoginResponse, RegisterResponse, User } from '../models/auth.model';
import { Observable,tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl='http://localhost:5000/auth';

  constructor(
    private http:HttpClient,
    private router:Router
  ){}

  login(data:{email:string;password:string}):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`,data)
    .pipe(
      tap((res)=>{
        localStorage.setItem('authToken',res.token);
        localStorage.setItem('currentUser',JSON.stringify(res.user));
      })
    );
}

register(data:{name:string;email:string;password:string}):Observable<RegisterResponse>{
  return this.http.post<RegisterResponse>(`${this.baseUrl}/register`,data);
}

logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

getToken():string| null{
  return localStorage.getItem('authToken');
}

getUser(): User | null{
  const user=localStorage.getItem('currentUser');
  return user?JSON.parse(user):null;
}

isLoggedIn():boolean{
  return !!this.getToken();
}
}
