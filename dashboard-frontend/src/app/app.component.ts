import { Component } from '@angular/core';
import { ApiService, User } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  email = '';
  password = '';
  taskTitle = '';
  tasks: any[] = [];

  constructor(public api: ApiService) {}

  login() {
    this.api.login(this.email, this.password).subscribe(res => {
      this.api.setToken(res.access_token);
      this.loadTasks();
    });
  }

  loadTasks() {
    this.api.getTasks().subscribe(res => (this.tasks = res));
  }

  canCreateTask(): boolean {
    return this.api.currentUser?.role === 'Admin' || this.api.currentUser?.role === 'Owner';
  }

  addTask() {
    if (!this.taskTitle) return;
    this.api.createTask(this.taskTitle).subscribe(() => {
      this.taskTitle = '';
      this.loadTasks();
    });
  }
}