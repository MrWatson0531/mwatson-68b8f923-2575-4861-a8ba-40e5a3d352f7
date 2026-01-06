import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken() || ''}`,
      }),
    };
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.headers());
  }

  createTask(title: string): Observable<any> {
    return this.http.post(this.baseUrl, { title }, this.headers());
  }

  updateTask(id: number, title: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { title }, this.headers());
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.headers());
  }
}