import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private backend_url = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.backend_url}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.backend_url}/login`, user);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.backend_url}/logout`, {});
  }
}
