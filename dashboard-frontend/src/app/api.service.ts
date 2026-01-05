import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3333'; // your NestJS backend
  private token: string = '';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`, this.getAuthHeader());
  }

  createTask(title: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, { title }, this.getAuthHeader());
  }

  private getAuthHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }
}