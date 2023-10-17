import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = '/api/auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.authUrl}/logout`, {});
  }
}
