import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export type Role = 'Owner' | 'Admin' | 'Viewer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  role: Role | null = null;

  private demoUsers = [
    { email: 'owner@example.com', password: 'owner123', role: 'Owner' as Role },
    { email: 'admin@example.com', password: 'admin123', role: 'Admin' as Role },
    { email: 'viewer@example.com', password: 'viewer123', role: 'Viewer' as Role },
  ];

  login(email: string, password: string): Observable<{ token: string; role: Role }> {
    const user = this.demoUsers.find(u => u.email === email && u.password === password);
    if (!user) return throwError(() => new Error('Invalid credentials'));

    this.token = 'demo-token';
    this.role = user.role;
    return of({ token: this.token, role: user.role });
  }

  logout() {
    this.token = null;
    this.role = null;
  }

  getToken(): string | null { return this.token; }
  isLoggedIn(): boolean { return !!this.token; }

  canCreateTask() { return this.role === 'Owner' || this.role === 'Admin'; }
  canEditTask() { return this.role === 'Owner' || this.role === 'Admin'; }
  canDeleteTask() { return this.role === 'Owner' || this.role === 'Admin'; }
}