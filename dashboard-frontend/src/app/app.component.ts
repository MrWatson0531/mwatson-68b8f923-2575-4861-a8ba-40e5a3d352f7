import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  email = '';
  password = '';
  taskTitle = '';
  tasks: any[] = [];

  constructor(private api: ApiService) {}

  login() {
    this.api.login(this.email, this.password).subscribe(res => {
      this.api.setToken(res.access_token);
      this.loadTasks();
    });
  }

  loadTasks() {
    this.api.getTasks().subscribe(res => (this.tasks = res));
  }

  addTask() {
    if (!this.taskTitle) return;
    this.api.createTask(this.taskTitle).subscribe(() => {
      this.taskTitle = '';
      this.loadTasks();
    });
  }
}