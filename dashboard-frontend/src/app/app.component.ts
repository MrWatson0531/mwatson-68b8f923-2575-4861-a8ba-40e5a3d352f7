import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle = '';
  email = '';
  password = '';
  loginError = '';

  constructor(public api: ApiService, public auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) this.loadTasks();
  }

  login() {
    this.loginError = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.loadTasks(),
      error: () => this.loginError = 'Invalid credentials'
    });
  }

  loadTasks() {
    this.api.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  createTask() {
    if (!this.newTaskTitle) return;
    this.api.createTask(this.newTaskTitle).subscribe(() => {
      this.newTaskTitle = '';
      this.loadTasks();
    });
  }

  editTask(task: any) {
    const title = prompt('Edit task', task.title);
    if (title) this.api.updateTask(task.id, title).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number) {
    if (confirm('Delete this task?')) this.api.deleteTask(id).subscribe(() => this.loadTasks());
  }
}