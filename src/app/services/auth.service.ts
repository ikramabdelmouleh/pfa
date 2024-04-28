import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/`);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { email, password }).pipe(
      tap(response => {
        if (response && response.jwt) {
          // Store JWT token in local storage
          localStorage.setItem('jwt', response.jwt);
        }
      })
    );
  }
  logout(): Observable<any> {
    // Remove JWT token from local storage
    localStorage.removeItem('jwt');

    // Make HTTP request to logout endpoint
    return this.http.post<any>('/logout/', {});
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, { name, email, password });
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/`);
  }
  isLoggedIn(): boolean {
    // Check if JWT token exists in local storage
    return !!localStorage.getItem('jwt');
  }

}
