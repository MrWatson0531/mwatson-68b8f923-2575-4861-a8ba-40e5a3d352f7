import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {\
    id: number;
    email: string;
    role: 'Owner' | 'Admin' | 'User';
    organizationId: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3333'; 
  private token: string = '';
  public currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
  }

  login(email: string, password: string): Observable<User> {
    return new Observable(observer => {
      this.http.post<any>(`${this.baseUrl}/auth/login`, { email, password }).subscribe(res => {
        this.setToken(res.access_token);
        this.currentUser = res.user;
        observer.next(res.user);
        observer.complete();
      });
    });
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